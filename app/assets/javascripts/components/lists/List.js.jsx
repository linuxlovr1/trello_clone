class List extends React.Component {
  constructor(props){
    super(props);
    this.state = { cards: [] };
    this.addCard = this.addCard.bind(this);
  }

  componentDidMount() {
    $.ajax({
      url: '/cards',
      type: 'GET',
      data: { list_id: this.props.id },
      dataType: 'JSON'
    }).success( cards => {
      this.setState({ cards: cards });
    }).error( cards => {
      console.log(cards)
    });
  }

  addCard(e) {
   e.preventDefault();
   let name = this.refs.name;
   let description = this.refs.description;
   $.ajax({
     url: "/cards",
     type: "POST",
     data: { list_id: this.props.id, card: { name: name.value, description: description.value }}
   }).success( card => {
     let cards = this.state.cards;
     cards.unshift(card);
     this.setState({ cards: cards });
   }).complete( () => {
     name.value = null;
     description.value = null;
   });
 }

 render() {
   let cards = this.state.cards.map( card => {
   return(
     <li key={`card-${card.id}`} className="collection-item">
       <div>{card.name}
         <div className="secondary-content">{card.description}</div>
       </div>
     </li>
     );
  });
 
  return(
    <div className="col s12 m3">
      <form onSubmit={this.addCard}>
        <input placeholder="name" ref="name" />
        <input placeholder="description" ref="description" />
        <button className="btn" type="submit">Add Card</button>
     </form>
     <h5 className="center">{this.props.name}</h5>
     <ul className="collection">
      { cards }
     </ul>
   </div>
  )
 }
}