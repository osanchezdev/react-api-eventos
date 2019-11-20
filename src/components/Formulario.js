import React, { Component } from 'react';
import { CategoriasConsumer } from './../context/CategoriasContext';
import { EventosConsumer } from './../context/EventosContext';
class Formulario extends Component {
  state = {
    nombre: '',
    categoria: ''
  };

  // Si el usuario agrega un evento o categoria

  obtenerDatosEvento = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <EventosConsumer>
        {({ eventos, obtenerEventos }) => (
          <form
            onSubmit={e => {
              e.preventDefault();

              if (this.state.nombre !== '') obtenerEventos(this.state);
            }}
          >
            <fieldset className='uk-fieldset uk-margin'>
              <legend className='uk-legend uk-text-center'>
                Busca tu evento por Nombre o Categoría
              </legend>
            </fieldset>
            <div className='uk-column-1-3@m uk-margin'>
              <div className='uk-margin' uk-margin='true'>
                <input
                  name='nombre'
                  className='uk-input'
                  type='text'
                  placeholder='Nombre de evento o ciudad'
                  onChange={this.obtenerDatosEvento}
                />
              </div>
              <div className='uk-margin' uk-margin='true'>
                <select
                  name='categoria'
                  className='uk-select'
                  onChange={this.obtenerDatosEvento}
                >
                  <option value=''>--Seleccione categoria--</option>
                  <CategoriasConsumer>
                    {value =>
                      value.categorias.map(categoria => (
                        <option
                          key={categoria.id}
                          value={categoria.id}
                          data-uk-form-select
                        >
                          {categoria.name_localized}
                        </option>
                      ))
                    }
                  </CategoriasConsumer>
                </select>
              </div>
              <div>
                <input
                  type='submit'
                  className='uk-button uk-button-danger'
                  value='Busca eventos'
                />
              </div>
            </div>
          </form>
        )}
      </EventosConsumer>
    );
  }
}

export default Formulario;
