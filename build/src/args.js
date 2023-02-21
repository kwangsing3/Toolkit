"use strict";
// 分析帶入的標頭屬性
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetArgs = void 0;
/**
 * example code:
 * const args: {[x: string]: string}  = GetArgs();
 */
function GetArgs() {
    const args = {};
    process.argv.slice(2).map(element => {
        const matches = element.match('--([a-zA-Z0-9]+)=(.*)');
        if (matches) {
            args[matches[1]] = matches[2].replace(/^['"]/, '').replace(/['"]$/, '');
        }
    });
    return args;
}
exports.GetArgs = GetArgs;
//# sourceMappingURL=args.js.map