import React from 'react';

// 展示每个分类的标题（绿松石色）
class ProductCategoryRow extends React.Component {
    render() {
        return (
            <tr>
                <th colSpan="2">{this.props.category}</th>
            </tr>
        )
    }
}

// 用行来展示每个作品（红色）
class ProductRow extends React.Component {
    render() {
        var name = this.props.product.stocked ?
            this.props.product.name :
            <span style={{color: 'red'}}>{this.props.product.name}</span>

        return (
            <tr>
                <td>{name}</td>
                <td>{this.props.product.price}</td>
            </tr>
        )
    }
}

// 根据用户数据过滤并展示数据集合（绿色）
class ProductTable extends React.Component {
    render() {
        var rows = [];
        var lastCategory = null;
    }
}

class App extends Component {
    render() {
        return (
            <div className="App">

            </div>
        );
    }
}

export default App;
