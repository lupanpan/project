/**
 * Created by Mtime on 2017/12/26.
 */

const tmpl = addrs => `
    <table>
    ${addrs.map(addr => `
        <tr><td>${addr.first}</td></tr>
        <tr><td>${addr.last}</td></tr>
    `).join('')}
    </table>
`;

// 将箭头函数改为普通函数后的写法
const tmplFun = function(addrs) {
    return `
        <table>
            ${addrs.map(function(addr) {
                return `
                <tr><td>${addr.first}</td></tr>
                <tr><td>${addr.last}</td></tr>
                `
            }).join('')}
        </table>
    `
}

const data = [
    { first: '<Jane>', last: 'Bond' },
    { first: 'Lars', last: '<Croft>' },
];

console.log(tmpl(data));
// <table>
//
//   <tr><td><Jane></td></tr>
//   <tr><td>Bond</td></tr>
//
//   <tr><td>Lars</td></tr>
//   <tr><td><Croft></td></tr>
//
// </table>