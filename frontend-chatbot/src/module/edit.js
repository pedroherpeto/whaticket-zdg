import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import axios from 'axios';

import { matchPath } from 'react-router'

const baseUrl = "http://localhost:3000"

class EditComponent extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      dataEmployee:{},
      campPergunta: "",
      campResposta:""
    }
  }
  

  componentDidMount(){

    const match = matchPath(this.props.history.location.pathname, {
      path: '/edit/:param',
      exact: true,
      strict: false
    })

    let userId = match.params.param;
    console.log(userId);
    const url = baseUrl+"/perguntas/get/"+userId
    axios.get(url)
    .then(res=>{
      if (res.data.success) {
        const data = res.data.data[0]
        this.setState({
          dataEmployee:data,
          campPergunta:data.pergunta,
          campResposta:data.resposta
        })
      }
      else {
        alert("Error web service")
      }
    })
    .catch(error=>{
      alert("Error server "+error)
    })
  }

  render(){
    return (
      <div>
        <div class="form-row justify-content-center">
          <div class="form-group col-md-6">
            <label for="inputPassword4">Pergunta</label>
            <input type="text" class="form-control"  placeholder="Pergunta"
              value={this.state.campPergunta} onChange={(value)=> this.setState({campPergunta:value.target.value})}/>
          </div>
          <div class="form-group col-md-6">
            <label for="inputEmail4">Resposta</label>
            <input type="email" class="form-control"  placeholder="Resposta"
              value={this.state.campResposta} onChange={(value)=> this.setState({campResposta:value.target.value})}/>
          </div>
        </div>
        <button type="submit" class="btn btn-primary" onClick={()=>this.sendUpdate()}>Atualizar</button>
      </div>
    );
  }

  sendUpdate(){
   
    const match = matchPath(this.props.history.location.pathname, {
      path: '/edit/:param',
      exact: true,
      strict: false
    })

    let userId = match.params.param;
    
    const baseUrl = "http://localhost:3000/perguntas/update/"+userId
    // parametros de datos post
    const datapost = {
      pergunta : this.state.campPergunta,
      resposta : this.state.campResposta
    }

    axios.post(baseUrl,datapost)
    .then(response=>{
      if (response.data.success===true) {
        alert(response.data.message)
      }
      else {
        alert("Error")
      }
    }).catch(error=>{
      alert("Error 34 "+error)
    })

   }

}


export default EditComponent;