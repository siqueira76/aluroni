import { useEffect, useState } from 'react';
import Item from './item'
import cardapio from './itens.json'
import styles from './Itens.module.scss'

interface Props {
    busca: string;
    filtro: number | null;
    ordenador: string;
}

export default function Itens(props: Props){
    
    const [lista, setLista] = useState(cardapio);
    const {busca, filtro} = props;

    function testaBusca(title: string){
        const regex = new RegExp(busca, 'i');
        return regex.test(title);
    }

    function testaFiltro(id: number){
        if(filtro !== null) return filtro === id;
        return true;
    }    

    useEffect(() => {
        const novaLista = cardapio.filter(Item => testaBusca(Item.title) && testaFiltro(Item.category.id));   
        setLista(novaLista);
    }, [busca, filtro]);

    return(
        <div className={styles.itens}>
            {lista.map((item) => (
                <Item key={item.id} {...item}></Item>
            ))}
        </div>
    );
}