import React, { Component } from 'react';
import List from './List'
class App extends Component {
  constructor(props) {
    super(props); 
    /* Burada super(props)'a göndermem gerekiyor. React bu işlemi zorunlu tutuyor. 
    Eğer yapılmazsa property'lerde kayıplar yaşanabiliyor. Çünkü burada component'e extends ettiğim için
    component'te yapacağı işleri super(props) ile (bu işleri) sen yap diyorum. */
    this.state = {
      productItems: [
        { id: 0, name: 'iPhone', count:2, price: 7000 },
        { id: 1, name: 'iPad', count:5, price: 5000 },
        { id: 2, name: 'iPod', count:1, price: 2000 }
      ],
      currentItems: {
        id: 0,
        name:'',
        count:'',
        price:''
      }
    }

    this.onChange = this.onChange.bind(this)
    this.addItem = this.addItem.bind(this)
    /* constructor içerisinde bind işlemini gerçekleştirmek için App class'ına bağlamak zorundayım. 
    Bu şekilde bind ettiğimde fonksiyonun yeni bir kopyası üretilir ve buradaki ifade this değeri 
    App class'ına ait yeni bir fonksiyon yaratır. Daha sonra bu yeni fonksiyonu alıp mevcut 
    addItem fonksiyonun üzerine yazıyor. Ya da addItem = (event) => arrow fonksiyonuna da
    dönüştürebilir. Ve bu sayede arrow fonksiyonu otomatik olarak this değerini her zaman App 
    class'ına bağlayacaktır. */
  }

  onChange(event) {
    this.setState({
      currentItems: {
        id: Date.now(),
        name: event.target.value
      }
    })
  }

  addItem(event) {
    event.preventDefault();
    const newItem = this.state.currentItems;
    console.log(newItem);
    if (newItem.name !== '') {
      const newItems = [...this.state.productItems, newItem];
      this.setState({
        productItems: newItems,
        currentItems: {
          id: 0,
          name: '',
          count: '',
          price: ''
        }
      })
    }
  }

  render() {
    const {productItems} = this.state;
    return (
      <div className="ui container segment">
        <form className="ui form" onSubmit={this.addItem}>
          <h4 className="ui dividing header">Product Information</h4>
          <div className="four fields">
            <div className="field">
              <label htmlFor="productName"> Name </label>
              <input value={this.state.currentItems.name} onChange={this.onChange} type="text" id="productName" placeholder="Name"/>
            </div>
            {/* <div className="field">
              <label htmlFor="productCount"> Count </label>
              <input value={this.state.currentItems.count} onChange={(event) => this.setState({currentItems: {count: event.target.value}})} type="number" id="productCount" placeholder="Count" />
            </div>
            <div className="field">
              <label htmlFor="productPrice"> Price </label>
              <input value={this.state.currentItems.price} onChange={(event) => this.setState({currentItems: {price: event.target.value}})} type="number" id="productPrice" placeholder="Price" />
            </div> */}
            <div className="field">
              <label> &nbsp; </label>
              <button type="submit" className="ui button"> Add </button>
            </div>
          </div>
        </form>

        <List total={productItems.reduce((i, j) => (i + j.price * j.count), 0)} productItems = {this.state.productItems} />
      </div> 
    )
  }
}

export default App;
