import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';

class EditComponent extends React.Component{

 constructor(props){
   super(props);
   this.state = {
     campPergunta: "",
     campResposta: ""
   }
 } 

 render(){
  return (
    <div>
      <div class="form-row justify-content-center">
        <div class="form-group col-md-6">
          <label for="inputPassword4">Pergunta </label>
          <input type="text" class="form-control"  placeholder="Pergunta" value={this.state.campPergunta} onChange={(value)=> this.setState({campPergunta:value.target.value})}/>
        </div>
        <div class="form-group col-md-6">
          <label for="inputEmail4">Resposta</label>
          <input type="text" class="form-control"  placeholder="Resposta" value={this.state.campResposta} onChange={(value)=> this.setState({campResposta:value.target.value})}/>
        </div>
      </div>
      <button type="submit" class="btn btn-primary" onClick={()=>this.sendSave()}>Salvar</button>
    </div>
  );
}

sendSave(){

  if (this.state.campPergunta==="") {
    alert("O campo pergunta não pode estar vazio.")
  }
  else if (this.state.campResposta==="") {
     alert("O campo resposta não pode estar vazio.")
  }
  else {

    const baseUrl = "http://localhost:3000/perguntas/create"

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
        alert(response.data.message)
      }
    }).catch(error=>{
      alert("Error 34 "+ error)
    })

  }

}

}


export default EditComponent;