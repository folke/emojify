import {
  mockedRun,
  MockedRunResult,
  mockProcessExit,
  mockProcessStdout,
  mockProcessStderr,
  mockConsoleLog
} from "jest-mock-process"
import path = require("path")
import { emojify } from "./emojify"

const mockRun: (_: () => void) => MockedRunResult = mockedRun({
  stdout: mockProcessStdout,
  stderr: mockProcessStderr,
  exit: mockProcessExit,
  log: mockConsoleLog
})

describe.each([
  [":smile:", "😄"],
  [":sparkles:", "✨"],
  [":rocket:", "🚀"]
])("emojify %s to %s", (code, char) => {
  test(`emojify ${code} to ${char}`, () => {
    jest.resetModuleRegistry()
    const mocks: MockedRunResult = mockRun(() => {
      emojify(["node", path.resolve("./emojify.ts"), code])
    })
    expect(mocks.exit).not.toHaveBeenCalled()
    expect(mocks.log).toHaveBeenCalledWith(char)
  })
})

test("show help when running without options", () => {
  const mocks: MockedRunResult = mockRun(() => {
    emojify(["node", path.resolve("./emojify.ts")])
  })
  expect(mocks.exit).toHaveBeenCalledWith(1)
  expect(mocks.stdout).toHaveBeenCalledTimes(1)
  expect(mocks.stdout.mock.calls[0][0]).toMatch(/Usage/)
})

test("emojify from stdin", () => {
  const mocks: MockedRunResult = mockRun(() => {
    const stdin = require("mock-stdin").stdin()
    process.stdin.isTTY = false
    emojify(["node", path.resolve("./emojify.ts")])
    stdin.send(":smile:\n", "ascii")
    stdin.end()
    stdin.restore()
  })
  expect(mocks.exit).not.toHaveBeenCalled()
  expect(mocks.log).toHaveBeenCalledWith("😄")
})
