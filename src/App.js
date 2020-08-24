import React, { Component } from 'react';
import List from './List'
class App extends Component {
  constructor(props) {
    super(props); 
    /* Burada super(props)'a göndermem gerekiyor. React bu işlemi zorunlu tutuyor. 
    Eğer yapılmazsa property'lerde kayıplar yaşanabiliyor. Çünkü burada component'e extends ettiğim için
    component'te yapacağı işleri super(props) ile (bu işleri) sen yap diyorum. */
    this.state = {
      productItems: [],
      currentItem: {
        id: 0,
        name: '',
        count: '',
        price: ''
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
    const updateItem = this.state.currentItem;
    const updatedNewItem = {...updateItem, id: Date.now(), [event.target.name]: event.target.value};
    this.setState({
      currentItem: updatedNewItem
    })
  }

  addItem(event) {
    event.preventDefault();
    const newItem = this.state.currentItem;
    console.log('current item', newItem);
    if (newItem.name) {
      const newItems = [...this.state.productItems, newItem];
      this.setState({
        productItems: newItems,
        currentItem: {
          id: 0,
          name: '',
          count: '',
          price: ''
        }
      })
    }
    this.addForm.reset();
  }

  render() {
    const {productItems} = this.state;
    return (
      <div className="ui container segment">
        <form className="ui form" ref={input => this.addForm = input} onSubmit={this.addItem}>
          <h4 className="ui dividing header">Product Information</h4>
          <div className="four fields">
            <div className="field">
              <label htmlFor="productName"> Name </label>
              <input name="name" onChange={event => this.onChange(event)} type="text" placeholder="Name"/>
            </div>
            <div className="field">
              <label htmlFor="productCount"> Count </label>
              <input name="count" onChange={event => this.onChange(event)} type="number" placeholder="Count" />
            </div>
            <div className="field">
              <label htmlFor="productPrice"> Price </label>
              <input name="price" onChange={event => this.onChange(event)} type="number" placeholder="Price" />
            </div>
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
