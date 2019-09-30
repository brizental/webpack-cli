'use strict';

const path = require('path');
const execa = require('execa');

const { sync: spawnSync } = execa;
const { run } = require('../../utils/test-utils');

describe('env array', () => {
    it('is able to set two different environments for an array configuration', () => {
        run(__dirname);
        const devFile = path.join(__dirname, './bin/dev.js');
        const prodFile = path.join(__dirname, './bin/prod.js');

        const devScript = spawnSync('node', [devFile]);
        const prodScript = spawnSync('node', [prodFile]);

        expect(devScript.stdout).toBe('environment is development');
        expect(prodScript.stdout).toBe('environment is production');
    });

    it('is able compile sucessfully with prod flag', () => {
        run(__dirname, ['--prod']);
        const devFile = path.join(__dirname, './bin/dev.js');
        const prodFile = path.join(__dirname, './bin/prod.js');

        const devScript = spawnSync('node', [devFile]);
        const prodScript = spawnSync('node', [prodFile]);

        expect(devScript.stderr).toBe('');
        expect(prodScript.stderr).toBe('');
    });
});