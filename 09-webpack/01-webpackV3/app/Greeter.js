/**
 * Created by Mtime on 2018/1/3.
 */

import React, {Component} from 'react'
import config from './config.json';
import styles from './Greeter.css';

class Greeter extends Component {
    render() {
        return (
            //使用cssModule添加类名的方法
            <div className={styles.root}>
                {config.greetText}
            </div>
        );
    }
}

export default Greeter

/*var config = require('./config.json');

module.exports = function() {
    var greet = document.createElement('div');
    greet.textContent = config.greetText;
    return greet;
};*/

// 由于 webpack3.* / webpack2.* 已经内置可处理 JSON 文件，这里我们无需再添加 webpack1.* 需要的 json-loader。