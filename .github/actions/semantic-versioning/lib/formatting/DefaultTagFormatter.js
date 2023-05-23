"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultTagFormatter = void 0;
/** Default tag formatter which allows a prefix to be specified */
class DefaultTagFormatter {
    constructor(config) {
        this.namespace = config.namespace;
        this.tagPrefix = config.tagPrefix;
        this.namespaceSeperator = '-'; // maybe make configurable in the future
    }
    Format(versionInfo) {
        const result = `${this.tagPrefix}${versionInfo.major}.${versionInfo.minor}.${versionInfo.patch}`;
        if (!!this.namespace) {
            return `${result}${this.namespaceSeperator}${this.namespace}`;
        }
        return result;
    }
    GetPattern() {
        if (!!this.namespace) {
            return `${this.tagPrefix}*[0-9].*[0-9].*[0-9]${this.namespaceSeperator}${this.namespace}`;
        }
        return `${this.tagPrefix}*[0-9].*[0-9].*[0-9]`;
    }
    Parse(tag) {
        let stripedTag;
        if (this.tagPrefix.includes('/') && tag.includes(this.tagPrefix)) {
            let tagParts = tag
                .replace(this.tagPrefix, '<--!PREFIX!-->')
                .split('/');
            stripedTag = tagParts[tagParts.length - 1]
                .replace('<--!PREFIX!-->', this.tagPrefix);
        }
        else {
            let tagParts = tag.split('/');
            stripedTag = tagParts[tagParts.length - 1];
        }
        let versionValues = stripedTag
            .substring(this.tagPrefix.length)
            .slice(0, this.namespace === '' ? 999 : -(this.namespace.length + 1))
            .split('.');
        let major = parseInt(versionValues[0]);
        let minor = versionValues.length > 1 ? parseInt(versionValues[1]) : 0;
        let patch = versionValues.length > 2 ? parseInt(versionValues[2]) : 0;
        if (isNaN(major) || isNaN(minor) || isNaN(patch)) {
            throw `Invalid tag ${tag} (${versionValues})`;
        }
        return [major, minor, patch];
    }
    ;
}
exports.DefaultTagFormatter = DefaultTagFormatter;
