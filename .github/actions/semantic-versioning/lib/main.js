"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const action_1 = require("./action");
const ConfigurationProvider_1 = require("./ConfigurationProvider");
const core = __importStar(require("@actions/core"));
function setOutput(versionResult) {
    const { major, minor, patch, increment, formattedVersion, versionTag, changed, authors, currentCommit, previousCommit, previousVersion } = versionResult;
    const repository = process.env.GITHUB_REPOSITORY;
    if (!changed) {
        core.info('No changes detected for this commit');
    }
    core.info(`Version is ${formattedVersion}`);
    if (repository !== undefined) {
        core.info(`To create a release for this version, go to https://github.com/${repository}/releases/new?tag=${versionTag}&target=${currentCommit.split('/').slice(-1)[0]}`);
    }
    core.setOutput("version", formattedVersion);
    core.setOutput("major", major.toString());
    core.setOutput("minor", minor.toString());
    core.setOutput("patch", patch.toString());
    core.setOutput("increment", increment.toString());
    core.setOutput("changed", changed.toString());
    core.setOutput("version_tag", versionTag);
    core.setOutput("authors", authors);
    core.setOutput("lastVersion", authors);
    core.setOutput("previous_commit", previousCommit);
    core.setOutput("previous_version", previousVersion);
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const config = {
            branch: core.getInput('branch'),
            tagPrefix: core.getInput('tag_prefix'),
            useBranches: core.getInput('use_branches') === 'true',
            majorPattern: core.getInput('major_pattern'),
            minorPattern: core.getInput('minor_pattern'),
            versionFormat: core.getInput('version_format'),
            changePath: core.getInput('change_path'),
            namespace: core.getInput('namespace'),
            bumpEachCommit: core.getInput('bump_each_commit') === 'true',
            searchCommitBody: core.getInput('search_commit_body') === 'true',
            userFormatType: core.getInput('user_format_type')
        };
        if (config.versionFormat === '' && core.getInput('format') !== '') {
            core.warning(`The 'format' input is deprecated, use 'versionFormat' instead`);
            config.versionFormat = core.getInput('format');
        }
        if (core.getInput('short_tags') !== '') {
            core.warning(`The 'short_tags' input option is no longer supported`);
        }
        const configurationProvider = new ConfigurationProvider_1.ConfigurationProvider(config);
        const result = yield (0, action_1.runAction)(configurationProvider);
        setOutput(result);
    });
}
exports.run = run;
run();
