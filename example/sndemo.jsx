require("./demo.css");

var React = require("react");
var ReactDOM = require("react-dom");
var createReactClass = require("create-react-class");
var ReactPivot = require("..");

var gh = require("./gh.jsx");
var data = require("./sndata.json");

var dimensions = [
  { value: "number", title: "Number" },
  { value: "sys_created_on", title: "Sys Created On" },
  { value: "impact", title: "Impact" },
  { value: "state", title: "State" },
  { value: "category", title: "Category" },
];

var reduce = function (row, memo) {
  memo.count = (memo.count || 0) + 1;
  return memo;
};

var calculations = [
  {
    title: "Count",
    value: "count",
    className: "alignRight",
    sortBy: function (row) {
      return row.count;
    },
  },
];

var hideRows = (row) => row.amountTotal < 1000;

var Demo = createReactClass({
  getInitialState: function () {
    return { showInput: false };
  },
  toggleShow: function () {
    var showInput = this.state.showInput;
    this.setState({ showInput: !showInput });
  },
  render: function () {
    return (
      <div className="demo">
        <h1>ReactPivot tantest</h1>

        <p>
          ReactPivot is a data-grid component with pivot-table-like
          functionality.
        </p>

        <p>Muggles will love you.</p>

        <p>
          <a href="https://github.com/davidguttman/react-pivot">
            View project and docs on Github
          </a>
        </p>

        <div className={this.state.showInput ? "hide" : ""}>
          <ReactPivot
            rows={data}
            dimensions={dimensions}
            calculations={calculations}
            reduce={reduce}
            activeDimensions={["Transaction Type"]}
            hideRows={hideRows}
            nPaginateRows={20}
            compact={false}
          />
        </div>

        <div className={this.state.showInput ? "" : "hide"}>
          <textarea value={JSON.stringify(data, null, 2)} readOnly={true} />
        </div>

        <p>
          <a
            className={this.state.showInput ? "" : "strong"}
            onClick={this.toggleShow}
          >
            Grid View
          </a>
          {" | "}
          <a
            className={this.state.showInput ? "strong" : ""}
            onClick={this.toggleShow}
          >
            Input Data
          </a>
        </p>

        {gh}
      </div>
    );
  },
});

var el = document.createElement("div");
document.body.appendChild(el);

ReactDOM.render(<Demo />, el);
