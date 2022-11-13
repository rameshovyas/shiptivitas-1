import React from 'react';
import ReactDOM from 'react-dom';
import Dragula from 'dragula';
import 'dragula/dist/dragula.css';
import Swimlane from './Swimlane';
import './Board.css';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    const clients = this.getClients();
    this.state = {
      clients: {
        backlog: clients.filter(client => !client.status || client.status === 'backlog'),
        inProgress: clients.filter(client => client.status && client.status === 'in-progress'),
        complete: clients.filter(client => client.status && client.status === 'complete'),
      }
    }
    this.swimlanes = {
      backlog: React.createRef(),
      inProgress: React.createRef(),
      complete: React.createRef(),
    }
  }

  componentDidMount() {
    const backlog = ReactDOM.findDOMNode(document.querySelector(" div.backlog > div:nth-child(1) > div:nth-child(2) "));
    const inProgress = ReactDOM.findDOMNode(document.querySelector("div.inprogress > div:nth-child(1) > div:nth-child(2)"));
    const complete = ReactDOM.findDOMNode(document.querySelector("div.complete > div:nth-child(1) > div:nth-child(2)"));
    let drag = Dragula([backlog,inProgress,complete]);
    drag.on('drop', (el,target,source, sibling) =>{
      //Backlog is Source
      if(source.parentNode.parentElement.classList[1]==="backlog"){
        el.classList.remove("Card-grey");
        if(target.parentNode.parentElement.classList[1]==="inprogress")
         el.classList.add("Card-blue");    
        else{ 
        if(target.parentNode.parentElement.classList[1]==="complete") 
          el.classList.add("Card-green");         
        else  
          el.classList.add("Card-grey");          
       } 
      }

      //Inprogress is Source
      if(source.parentNode.parentElement.classList[1]==="inprogress"){
        el.classList.remove("Card-blue");
        if(target.parentNode.parentElement.classList[1]==="complete")
         el.classList.add("Card-green");    
        else{ 
        if(target.parentNode.parentElement.classList[1]==="backlog") 
          el.classList.add("Card-grey");         
        else  
          el.classList.add("Card-blue");          
       } 
      }

      //complete is Source
      if(source.parentNode.parentElement.classList[1]==="complete"){
        el.classList.remove("Card-green");
        if(target.parentNode.parentElement.classList[1]==="inprogress")
         el.classList.add("Card-blue");    
        else{ 
        if(target.parentNode.parentElement.classList[1]==="backlog") 
          el.classList.add("Card-grey");         
        else  
          el.classList.add("Card-green");          
       } 
      }
      
    })       
  }

  getClients() {
    return [
      ['1','Stark, White and Abbott','Cloned Optimal Architecture', 'backlog'],
      ['2','Wiza LLC','Exclusive Bandwidth-Monitored Implementation', 'backlog'],
      ['3','Nolan LLC','Vision-Oriented 4Thgeneration Graphicaluserinterface', 'backlog'],
      ['4','Thompson PLC','Streamlined Regional Knowledgeuser', 'backlog'],
      ['5','Walker-Williamson','Team-Oriented 6Thgeneration Matrix', 'backlog'],
      ['6','Boehm and Sons','Automated Systematic Paradigm', 'backlog'],
      ['7','Runolfsson, Hegmann and Block','Integrated Transitional Strategy', 'backlog'],
      ['8','Schumm-Labadie','Operative Heuristic Challenge', 'backlog'],
      ['9','Kohler Group','Re-Contextualized Multi-Tasking Attitude', 'backlog'],
      ['10','Romaguera Inc','Managed Foreground Toolset', 'backlog'],
      ['11','Reilly-King','Future-Proofed Interactive Toolset', 'backlog'],
      ['12','Emard, Champlin and Runolfsdottir','Devolved Needs-Based Capability', 'backlog'],
      ['13','Fritsch, Cronin and Wolff','Open-Source 3Rdgeneration Website', 'backlog'],
      ['14','Borer LLC','Profit-Focused Incremental Orchestration', 'backlog'],
      ['15','Emmerich-Ankunding','User-Centric Stable Extranet', 'backlog'],
      ['16','Willms-Abbott','Progressive Bandwidth-Monitored Access', 'backlog'],
      ['17','Brekke PLC','Intuitive User-Facing Customerloyalty', 'backlog'],
      ['18','Bins, Toy and Klocko','Integrated Assymetric Software', 'backlog'],
      ['19','Hodkiewicz-Hayes','Programmable Systematic Securedline', 'backlog'],
      ['20','Murphy, Lang and Ferry','Organized Explicit Access', 'backlog'],
    ].map(companyDetails => ({
      id: companyDetails[0],
      name: companyDetails[1],
      description: companyDetails[2],
      status: companyDetails[3],
    }));
  }
  renderSwimlane(name, clients, ref) {
    return (
      <Swimlane name={name} clients={clients} dragulaRef={ref}/>
    );
  }

  render() {
    return (
      <div className="Board">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4 backlog">
              {this.renderSwimlane('Backlog', this.state.clients.backlog, this.swimlanes.backlog)}
            </div>
            <div className="col-md-4 inprogress">
              {this.renderSwimlane('In Progress', this.state.clients.inProgress, this.swimlanes.inProgress)}
            </div>
            <div className="col-md-4 complete">
              {this.renderSwimlane('Complete', this.state.clients.complete, this.swimlanes.complete)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
