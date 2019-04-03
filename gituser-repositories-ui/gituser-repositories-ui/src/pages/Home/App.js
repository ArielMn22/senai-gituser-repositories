import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import '../../assets/css/index.css'
import logo from '../../assets/imgs/react-logo.png'

class App extends Component {

  // Construindo funções
  constructor() {
    super();
    
    this.state = {
      lista: [],
      id: "",
      name: "",
      description: "",
      created_at: "",
      size: ""
    };

    this.buscaUsuarioRepositories = this.buscaUsuarioRepositories.bind(this);
    this.atualizaNome = this.atualizaNome.bind(this);
    // this.cadastrarTipoEvento = this.cadastrarTipoEvento.bind(this);
  }
  
  buscaUsuarioRepositories(event)
  {
    event.preventDefault();

    console.log("valor do this.state.nome: " + this.state.nome);
    
    fetch("https://api.github.com/users/" + this.state.nome + "/repos?client_id=f9e71b257ab4a97c6a62&client_secret=9682bfc66b0a2c1711dc99d79d9887ec95e91c3e", {
      method: 'GET',
      // autorizacao
      // headers: {
      //   'Authorization' : 'Basic usuario:senha'
      // }
    })
    .then(response => response.json())
    .then(data => this.setState({ lista: data }))
    // .then(data => console.log(data))
    .catch(erro => console.log(erro))
  }

  atualizaNome(event)
  {
    this.setState({nome: event.target.value});
  }

  // componentDidMount()
  // {
  //   this.buscaUsuarioRepositories();
  // }
  
  render() {
    return (
      <div>
      <header>
        <nav id="navSuperior">
            <div id="navLogo">
                <img src={logo} alt="Logo do React JS" />
            </div>
            <ul id="navOptions">
                <li>Home</li>
            </ul>
        </nav>
    </header>
    <main className="pa-all-g">
        <form id="usuarioForm" onSubmit={this.buscaUsuarioRepositories}>
            <input className="userInpt" type="text" name="usuarioNome" value={this.setState.nome} onChange={this.atualizaNome} placeholder="Usuário GitHub" />
            <button className="userBtn" type="submit">Listar Repositórios</button>
        </form>

        <section id="repositories" className="pa-all-g">
            <img className="react-banner" src={logo} alt="Logo React Js." />
            <h1>Repositórios</h1>
            <div id="tabela" className="pa-all-g">
                <table>
                  <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Descricão</th>
                        <th>Data de Criação</th>
                        <th>Tamanho</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.lista.map(function(repositorio) {
                      return (
                        <tr>
                          <td>{repositorio.id}</td>
                          <td>{repositorio.name}</td>
                          <td>{repositorio.description}</td>
                          <td>{repositorio.created_at}</td>
                          <td>{repositorio.size}</td>
                        </tr>
                      );
                    })}
                  </tbody>

                  {/* {this.state.lista.map(function(tipoevento) {
                    return (
                      <tr key={tipoevento.id}>
                        <td key={tipoevento.id.toString()}>{tipoevento.id}</td>
                        <td>{tipoevento.nome}</td>
                      </tr>
                    );
                  })} */}
                    {/* <tr>
                        <td>1</td>
                        <td>Primeiro</td>
                        <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias obcaecati, facilis, culpa.</td>
                        <td>12/2/2002</td>
                        <td>200 MB</td>
                    </tr> */}
                </table>
            </div>
        </section>
    </main>
    </div>
    );
  }
}

export default App;
