import React from 'react';

class RecomItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEllipsis: 'none'
    };

    this.clkLink = this.clkLink.bind(this);
  }

  clkLink () {
  	let url = this.props.item.url;
    if (url) {
      this.props.toUrl(url, '', true);
    }
  }

  componentDidMount () {
    let summary = this.refs.summary;
    if (summary.clientHeight > summary.parentNode.clientHeight) {
      this.setState({
        showEllipsis: ''
      });
    }
  }

  render () {
    let item = this.props.item;

  	return (
  		<div onClick={this.clkLink} className="recom-item">
			  <img className="title-pic" src={item.pic} alt="标题图" />
			  <div className="content">
			    <p className="recom-title ft36">{item.title}</p>
			    <div className="summary-box ft30">
            <p ref="summary">{item.summary}</p>
            <i className="ellipsis" style={{display: this.state.showEllipsis}}>...</i>
			    </div>
          <p className="bot-info ft28">
            <span>{item.date}</span>
            <span className="cmt-count">{item.coment_count || 0}</span>
          </p>
			  </div>
			</div>
		);
  }
}

export default RecomItem;
