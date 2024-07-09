import React, { useEffect, useMemo, useReducer, useState } from 'react'
import { createContext } from 'react'
import { carrinhoReducer } from '../reducers/carrinhoReducer';

export const CarrinhoContext = createContext();

CarrinhoContext.displayName = "Carrinho"

const estadoInicial = [];

export const CarrinhoProvider = ({children}) => {

    const [carrinho, dispatch] = useReducer(carrinhoReducer, estadoInicial)
    const [quantidade, setQuantidade] = useState(0);
    const [valorTotal, setValorTotal] = useState(0);

    const { totalTemporaria, quantidadeTemporaria } = useMemo(() => {
        return carrinho.reduce((acumulador, produto) => ({
          quantidadeTemporaria: acumulador.quantidadeTemporaria + produto.quantidade,
          totalTemporaria: acumulador.totalTemporaria + produto.preco * produto.quantidade,
    
        }),
          {
            quantidadeTemporaria: 0,
            totalTemporaria: 0,
          }
        );
      }, [carrinho])
    
      useEffect(() => {
        setQuantidade(quantidadeTemporaria)
        setValorTotal(totalTemporaria)
      });
    
    return (
        <CarrinhoContext.Provider value={{carrinho, dispatch, quantidade, valorTotal}}>
            {children}
        </CarrinhoContext.Provider>
    )
}
