var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;
var base_url = 'http://3.0.181.231:1337';

var FlipCard = function (_React$Component) {
  _inherits(FlipCard, _React$Component);

  function FlipCard() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FlipCard);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FlipCard.__proto__ || Object.getPrototypeOf(FlipCard)).call.apply(_ref, [this].concat(args))), _this), _this.evalDiscount = function () {
      var _this$props$data = _this.props.data,
          price = _this$props$data.price,
          discount = _this$props$data.discount;


      if (discount === 0) {
        return React.createElement(
          "span",
          { className: "real-price" },
          "RM ",
          price.toFixed(2)
        );
      }

      discount = (100 - discount) / 100;

      return React.createElement(
        "div",
        null,
        React.createElement(
          "span",
          { className: "default-price" },
          "RM ",
          price.toFixed(2)
        ),
        React.createElement("br", null),
        React.createElement(
          "span",
          { className: "real-price" },
          "RM ",
          (discount * price).toFixed(2)
        )
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(FlipCard, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "flip-card" },
        React.createElement(
          "div",
          { className: "card-body" },
          React.createElement(
            "div",
            { style: { width: '100%' } },
            React.createElement(
              "h6",
              { className: "title" },
              this.props.data.name
            )
          ),
          React.createElement(
            "div",
            { className: "front" },
            React.createElement("img", {
              className: "card-img-top",
              src: "" + base_url + this.props.data.image.url
            })
          ),
          React.createElement(
            "div",
            { className: "back" },
            this.evalDiscount(),
            React.createElement(
              "button",
              {
                onClick: function onClick() {
                  return alert('Added to cart.');
                },
                className: "btn btn-outline-primary cart-button"
              },
              "Add To Cart"
            )
          )
        )
      );
    }
  }]);

  return FlipCard;
}(React.Component);

var Root = function (_React$Component2) {
  _inherits(Root, _React$Component2);

  function Root(props) {
    _classCallCheck(this, Root);

    var _this2 = _possibleConstructorReturn(this, (Root.__proto__ || Object.getPrototypeOf(Root)).call(this, props));

    _this2.fetchData = function (url, state, callback) {
      axios.get(url).then(function (res) {
        _this2.setState(_defineProperty({}, state, res.data));
        callback();
      });

      var word = 'Cheetah';
    };

    _this2._renderTags = function () {
      return React.createElement(
        "div",
        { style: { margin: 10 }, className: "card" },
        React.createElement(
          "div",
          { className: "card-body" },
          React.createElement(
            "h5",
            { className: "card-title" },
            "Tags"
          ),
          React.createElement(
            "ul",
            { className: "list-group" },
            _this2.state.tags.map(function (t) {
              return React.createElement(
                "li",
                { key: t._id, className: "list-group-item hvr-sweep-to-left" },
                t.name
              );
            })
          )
        )
      );
    };

    _this2._handleFilter = function (name, type) {
      _this2.setState({
        appliedFilter: {
          type: type,
          name: name
        }
      });
    };

    _this2._showCategory = function () {
      if (_this2.state.appliedFilter !== null) {
        if (_this2.state.appliedFilter.type === 'category') {
          return React.createElement(
            "small",
            null,
            _this2.state.appliedFilter.name
          );
        }
        return null;
      }
      return null;
    };

    _this2._renderCategories = function () {
      return React.createElement(
        "div",
        { style: { margin: 10 }, className: "card" },
        React.createElement(
          "div",
          { className: "card-body" },
          React.createElement(
            "div",
            null,
            React.createElement(
              "h5",
              { className: "card-title" },
              "Categories"
            )
          ),
          React.createElement(
            "ul",
            { className: "list-group" },
            _this2.state.categories.map(function (c) {
              return React.createElement(
                "li",
                {
                  onClick: function onClick() {
                    return _this2._handleFilter(c.name, 'category');
                  },
                  style: { cursor: 'pointer' },
                  key: c._id,
                  className: "list-group-item hvr-sweep-to-left"
                },
                c.name.toUpperCase()
              );
            })
          )
        )
      );
    };

    _this2._renderProducts = function () {
      if (_this2.state.appliedFilter !== null) {
        var products = _this2.state.products.filter(function (p) {
          return p[_this2.state.appliedFilter.type].name === _this2.state.appliedFilter.name;
        });

        return React.createElement(
          "div",
          { className: "container" },
          React.createElement(
            "div",
            { className: "flex-container" },
            products.map(function (p) {
              return React.createElement(
                "div",
                { key: p._id, className: "flex-item" },
                React.createElement(FlipCard, { data: p })
              );
            })
          )
        );
      }

      return React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "div",
          { className: "flex-container" },
          _this2.state.products.map(function (p) {
            return React.createElement(
              "div",
              { key: p._id, className: "flex-item" },
              React.createElement(FlipCard, { data: p })
            );
          })
        )
      );
    };

    _this2.state = {
      loading: true,
      products: [],
      categories: [],
      tags: [],
      appliedFilter: null
    };
    return _this2;
  }

  _createClass(Root, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this3 = this;

      this.fetchData(base_url + "/products", 'products', function () {
        return _this3.fetchData(base_url + "/categories", 'categories', function () {
          return _this3.fetchData(base_url + "/tags", 'tags', function () {
            _this3.setState({ loading: false });
            console.log(_this3.state.products);
          });
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.loading) {
        return React.createElement(
          "div",
          null,
          "Loading"
        );
      }

      return React.createElement(
        "div",
        { className: "container-fluid" },
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "col-4" },
            this._renderCategories()
          ),
          React.createElement(
            "div",
            { className: "col-8" },
            this._renderProducts()
          )
        )
      );
    }
  }]);

  return Root;
}(React.Component);

var domContainer = document.querySelector('#root');
ReactDOM.render(e(Root), domContainer);