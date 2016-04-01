class Lists extends React.Component {
  constructor(props) {
    super(props);
    this.addList = this.addList.bind(this);
    this.baseUrl = `/boards/${this.props.id}/lists`;
    this.state = { lists: this.props.lists };
  }

  addList(list) {
    this.setState({ lists: [list, ...this.state.lists] });
  }

  render() {
    let lists = this.state.lists.map( list => {
      return(<List key={`list-${list.id}`} {...list} />);
    });

      return(
        <div className="row">
          <NewList id={this.props.id} addList={this.addList} />
          <h2 className="center">Lists</h2>
          {lists}
        </div>
      );
  }
}