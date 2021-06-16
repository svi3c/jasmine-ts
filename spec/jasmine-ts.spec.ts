import {spawn} from "child_process";
import * as path from "path";

describe("jasmine-ts", () => {

  it("should start with default parameters", async () => {
    const result = await testJasmine();
    expect(result.exitCode).toBe(1)
    expect(result.output).toContain('No specs found')
  });

  it('should process simple ts file with default params', async () => {
    const cwd = path.join(__dirname, 'test-cases', 'simple-ts-file')

    const result = await testJasmine(['index.ts'], cwd);
    expect(result.exitCode).toBe(0)
    expect(result.output).toContain('1 spec, 0 failures')
  })

  it('should process simple js file with default params', async () => {
    const cwd = path.join(__dirname, 'test-cases', 'simple-js-file')

    const result = await testJasmine(['index.js'], cwd);
    expect(result.exitCode).toBe(0)
    expect(result.output).toContain('1 spec, 0 failures')
  })

  it('should work with jasmine.json', async () => {
    const cwd = path.join(__dirname, 'test-cases', 'jasmine-json')

    const result = await testJasmine(['--config=./jasmine.json'], cwd);
    expect(result.exitCode).toBe(0)
    expect(result.output).toContain('1 spec, 0 failures')
    expect(result.output).not.toContain('Randomized with seed')
  })

  it('should work --require with node_module', async () => {
    const cwd = path.join(__dirname, 'test-cases', 'require')

    const result = await testJasmine(['--require="dotenv/config"', 'node_module.spec.ts'], cwd);
    expect(result.exitCode).toBe(0)
    expect(result.output).toContain('1 spec, 0 failures')
  })

  it('should work --require with relative file', async () => {
    const cwd = path.join(__dirname, 'test-cases', 'require')

    const result = await testJasmine(['--require="./require-file.js"', 'file.spec.ts'], cwd);
    expect(result.exitCode).toBe(0)
    expect(result.output).toContain('1 spec, 0 failures')
  })

  it('should work --require with relative file and node_modules', async () => {
    const cwd = path.join(__dirname, 'test-cases', 'require')

    const result = await testJasmine(['--require="./require-file.js"', '--require="dotenv/config"', 'file-and-node_module.spec.ts'], cwd);
    expect(result.exitCode).toBe(0)
    expect(result.output).toContain('1 spec, 0 failures')
  })

  it('should work with --reporter', async () => {
    const cwd = path.join(__dirname, 'test-cases', 'reporter')
    const reporterPath = path.join(cwd, 'custom-reporter.js')

    const result = await testJasmine([`--reporter="${reporterPath}"`, 'index.spec.ts'], cwd);
    expect(result.exitCode).toBe(0)
    expect(result.output).toContain('Executed 1 of 1 spec\x1B[32m SUCCESS\x1B[39m in ')
  })

  it('should work with --project', async () => {
    const cwd = path.join(__dirname, 'test-cases', 'project')
    const projectPath = path.join(cwd, 'sub-dir', 'tsconfig.json')

    const result = await testJasmine([`--project=${projectPath}`, 'index.spec.ts'], cwd);
    expect(result.exitCode).toBe(0)
    expect(result.output).toContain('1 spec, 0 failures')
  })

  it('should work with --compiler-options', async () => {
    const cwd = path.join(__dirname, 'test-cases', 'project')

    const result = await testJasmine(['--compiler-options="{\\"allowJs\\":true, \\"checkJs\\":false, \\"esModuleInterop\\":false}"', 'index.spec.ts'], cwd);
    expect(result.exitCode).toBe(0)
    expect(result.output).toContain('1 spec, 0 failures')
  })

  it('should work with --transpile-only', async () => {
    const cwd = path.join(__dirname, 'test-cases', 'transpile-only')

    const result = await testJasmine(['--transpile-only', 'index.spec.ts'], cwd);
    expect(result.exitCode).toBe(0)
    expect(result.output).toContain('1 spec, 0 failures')
  })

  it('should work with --color', async () => {
    const cwd = path.join(__dirname, 'test-cases', 'simple-ts-file')

    const result = await testJasmine(['--color', 'index.ts'], cwd);
    expect(result.exitCode).toBe(0)
    expect(result.output).toContain('Started\n\x1B[32m.\x1B[0m\n\n\n')
  })

  it('should work with --no-color', async () => {
    const cwd = path.join(__dirname, 'test-cases', 'simple-ts-file')

    const result = await testJasmine(['--no-color', 'index.ts'], cwd);
    expect(result.exitCode).toBe(0)
    expect(result.output).toContain('Started\n.\n\n\n')
  })

  it('should work with --stop-on-failure=false', async () => {
    const cwd = path.join(__dirname, 'test-cases', 'stop-on-failure')
    const reporterPath = path.join(cwd, 'custom-reporter.js')

    const result = await testJasmine(
      [
        '--config=./jasmine.json',
        '--stop-on-failure=false',
        `--reporter="${reporterPath}"`,
        'index.spec.ts'],
      cwd);
    expect(result.exitCode).toBe(1)
    expect(result.output).toContain('✗ test case 1')
    expect(result.output).toContain('✓ test case 2')
  })

  it('should work with --stop-on-failure=true', async () => {
    const cwd = path.join(__dirname, 'test-cases', 'stop-on-failure')
    const reporterPath = path.join(cwd, 'custom-reporter.js')

    const result = await testJasmine(
      [
        '--config=./jasmine.json',
        '--stop-on-failure=true',
        `--reporter="${reporterPath}"`,
        'index.spec.ts'],
      cwd);
    expect(result.exitCode).toBe(1)
    expect(result.output).toContain('✗ test case 1')
    expect(result.output).toContain('✗ test case 2')
  })

  it('should work with --fail-fast=false', async () => {
    const cwd = path.join(__dirname, 'test-cases', 'fail-fast')
    const reporterPath = path.join(cwd, 'custom-reporter.js')

    const result = await testJasmine(
      [
        '--config=./jasmine.json',
        '--fail-fast=false',
        `--reporter="${reporterPath}"`,
        'index.spec.ts'],
      cwd);
    expect(result.exitCode).toBe(1)
    expect(result.output).toContain('✗ should fail')
    expect(result.output).toContain('✓ should pass')
  })

  it('should work with --fail-fast=true', async () => {
    const cwd = path.join(__dirname, 'test-cases', 'fail-fast')
    const reporterPath = path.join(cwd, 'custom-reporter.js')

    const result = await testJasmine(
      [
        '--config=./jasmine.json',
        '--fail-fast=true',
        `--reporter="${reporterPath}"`,
        'index.spec.ts'],
      cwd);
    expect(result.exitCode).toBe(1)
    expect(result.output).toContain('✗ should fail')
    expect(result.output).not.toContain(' should pass')
    expect(result.output).toContain('1 SKIPPED')
  })

});

function testJasmine(args: string[] = [], cwd?: string): Promise<any> {
  return new Promise<any>((resolve) => {
    const indexJsPath = path.join(__dirname, '..', 'lib', 'index.js')

    const instance = spawn('node', [indexJsPath, ...args], {shell: true, cwd})
    let outBuffer = Buffer.alloc(0);
    instance.stdout.on('data', data => {
      outBuffer = Buffer.concat([outBuffer, data])
    })

    instance.stderr.on('data', data => {
      outBuffer = Buffer.concat([outBuffer, data])
    })

    instance.on('close', code => {
      resolve({
        exitCode: code,
        output: outBuffer.toString()
      })
    })
  })
}
