class NewList extends React.Component {
  constructor(props) {
    super(props);
    this.addList = this.addList.bind(this);
    this.backFunction = this.backFunction.bind(this);
  }

  backFunction() {
    window.location.href = `/boards`;
  }

  addList(e) {
    let name = this.refs.name;
    e.preventDefault();
    $.ajax({
      url: `/boards/${this.props.id}/lists`,
      type: 'POST',
      data: { list: { name: name.value }},
      dataType: 'JSON'
    }).success( list => {
      this.props.addList(list);
    }).error( errors => {
      alert(errors);
    }).complete( () => {
      name.value = null;
    });
  }


  render() {
    return(
      <div className="col s12 m10 offset-m1">
        <button onClick={() => backFunction} className='btn'>Back</button>
        <h4>Add a new list</h4>
        <form onSubmit={this.addList}>
          <input placeholder="Name" ref="name" required={true} />
          <button className="btn">Add</button>
        </form>
      </div>
    );
  }
}