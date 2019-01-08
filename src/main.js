const e = React.createElement;
const base_url = 'http://3.0.181.231:1337';

class FlipCard extends React.Component {
  evalDiscount = () => {
    let { price, discount } = this.props.data;

    if (discount === 0) {
      return <span className="real-price">RM {price.toFixed(2)}</span>;
    }

    discount = (100 - discount) / 100;

    return (
      <div>
        <span className="default-price">RM {price.toFixed(2)}</span>
        <br />
        <span className="real-price">RM {(discount * price).toFixed(2)}</span>
      </div>
    );
  };

  render() {
    return (
      <div className="flip-card">
        <div className="card-body">
          <div style={{ width: '100%' }}>
            <h6 className="title">{this.props.data.name}</h6>
          </div>
          <div className="front">
            <img
              className="card-img-top"
              src={`${base_url}${this.props.data.image.url}`}
            />
          </div>
          <div className="back">
            {this.evalDiscount()}
            <button
              onClick={() => alert('Added to cart.')}
              className="btn btn-outline-primary cart-button"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    );
  }
}

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      products: [],
      categories: [],
      tags: [],
      appliedFilter: null
    };
  }

  componentWillMount() {
    this.fetchData(`${base_url}/products`, 'products', () =>
      this.fetchData(`${base_url}/categories`, 'categories', () =>
        this.fetchData(`${base_url}/tags`, 'tags', () => {
          this.setState({ loading: false });
          console.log(this.state.products);
        })
      )
    );
  }

  fetchData = (url, state, callback) => {
    axios.get(url).then(res => {
      this.setState({ [state]: res.data });
      callback();
    });

    const word = 'Cheetah';
  };

  _renderTags = () => {
    return (
      <div style={{ margin: 10 }} className="card">
        <div className="card-body">
          <h5 className="card-title">Tags</h5>
          <ul className="list-group">
            {this.state.tags.map(t => (
              <li key={t._id} className="list-group-item hvr-sweep-to-left">
                {t.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  _handleFilter = (name, type) => {
    this.setState({
      appliedFilter: {
        type,
        name
      }
    });
  };

  _showCategory = () => {
    if (this.state.appliedFilter !== null) {
      if (this.state.appliedFilter.type === 'category') {
        return <small>{this.state.appliedFilter.name}</small>;
      }
      return null;
    }
    return null;
  };

  _renderCategories = () => {
    return (
      <div style={{ margin: 10 }} className="card">
        <div className="card-body">
          <div>
            <h5 className="card-title">Categories</h5>
          </div>

          <ul className="list-group">
            {this.state.categories.map(c => (
              <li
                onClick={() => this._handleFilter(c.name, 'category')}
                style={{ cursor: 'pointer' }}
                key={c._id}
                className="list-group-item hvr-sweep-to-left"
              >
                {c.name.toUpperCase()}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  _renderProducts = () => {
    if (this.state.appliedFilter !== null) {
      const products = this.state.products.filter(
        p =>
          p[this.state.appliedFilter.type].name ===
          this.state.appliedFilter.name
      );

      return (
        <div className="container">
          <div className="flex-container">
            {products.map(p => (
              <div key={p._id} className="flex-item">
                <FlipCard data={p} />
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="container">
        <div className="flex-container">
          {this.state.products.map(p => (
            <div key={p._id} className="flex-item">
              <FlipCard data={p} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  render() {
    if (this.state.loading) {
      return <div>Loading</div>;
    }

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-4">{this._renderCategories()}</div>

          <div className="col-8">{this._renderProducts()}</div>
        </div>
      </div>
    );
  }
}

const domContainer = document.querySelector('#root');
ReactDOM.render(e(Root), domContainer);
