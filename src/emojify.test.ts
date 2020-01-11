import {
  mockedRun,
  MockedRunResult,
  mockProcessExit,
  mockProcessStdout,
  mockProcessStderr,
  mockConsoleLog
} from "jest-mock-process"
import path = require("path")

const mockRun: (_: () => void) => MockedRunResult = mockedRun({
  stdout: mockProcessStdout,
  stderr: mockProcessStderr,
  exit: mockProcessExit,
  log: mockConsoleLog
})

const argv = process.argv.slice()
afterEach(() => {
  process.argv = argv
})

beforeEach(() => {
  jest.resetModuleRegistry()
})

describe.each([
  [":smile:", "😄"],
  [":sparkles:", "✨"],
  [":rocket:", "🚀"]
])("emojify %s to %s", (code, char) => {
  test(`emojify ${code} to ${char}`, () => {
    jest.resetModuleRegistry()
    process.argv = ["node", path.resolve("./emojify.ts"), code]
    const mocks: MockedRunResult = mockRun(() => {
      require("./emojify")
    })
    expect(mocks.exit).not.toHaveBeenCalled()
    expect(mocks.log).toHaveBeenCalledWith(char)
  })
})

test("show help when running without options", () => {
  process.argv = ["node", path.resolve("./emojify.ts")]
  const mocks: MockedRunResult = mockRun(() => {
    require("./emojify")
  })
  expect(mocks.exit).toHaveBeenCalledWith(1)
  expect(mocks.stdout).toHaveBeenCalledTimes(1)
  expect(mocks.stdout.mock.calls[0][0]).toMatch(/Usage/)
})

test("emojify from stdin", () => {
  process.argv = ["node", path.resolve("./emojify.ts")]

  const mocks: MockedRunResult = mockRun(() => {
    const stdin = require("mock-stdin").stdin()
    process.stdin.isTTY = false
    require("./emojify")
    stdin.send(":smile:\n", "ascii")
    stdin.end()
    stdin.restore()
  })
  expect(mocks.exit).not.toHaveBeenCalled()
  expect(mocks.log).toHaveBeenCalledWith("😄")
})
