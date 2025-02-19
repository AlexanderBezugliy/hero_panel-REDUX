import {useHttp} from '../../hooks/http.hook';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHeroes, heroDeleted } from './heroesSlice';
import { createSelector } from 'reselect';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';


const HeroesList = () => {
    const filteredHeroesSelector = createSelector(
        (state) => state.filtersReducer.activeFilter,
        (state) => state.heroesReducer.heroes,
        (filters, heroes) => {
            if (filters === 'all') {
                return heroes;
            } else {
                return heroes.filter(item => item.element === filters);
            }
        }
    )
    const filteredHeroes = useSelector(filteredHeroesSelector);
    const heroesLoadingStatus = useSelector(state => state.heroesLoadingStatus);

    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes())
        // eslint-disable-next-line
    }, []);

    // Функция берет id и по нему удаляет ненужного персонажа из store
    // ТОЛЬКО если запрос на удаление прошел успешно
    // Отслеживайте цепочку действий actions => reducers
    // const onDelete = useCallback((id) => {
    //     // Удаление персонажа по его id
    //     request(`http://localhost:3001/heroes/${id}`, "DELETE")
    //         .then(data => console.log(data, 'Deleted'))
    //         .then(dispatch(heroDeleted(id)))
    //         .catch(err => console.log(err));
    //     // eslint-disable-next-line  
    // }, [request]);
    //ВАРИНАТ ПРОСТО У УДАЛЕНИЕМ(НЕ С БАЗЫ ДАННЫХ):
    const onDelete = (id) => {
        dispatch(heroDeleted(id))
    }

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return (
                // <CSSTransition
                //     timeout={0}
                //     classNames="hero">
                //     <h5 className="text-center mt-5">Героев пока нет</h5>
                // </CSSTransition>
                <h5 className="text-center mt-5">Героев пока нет</h5>
            )
        }

        return arr.map(({id, ...props}) => {
            return (
                // <CSSTransition 
                //     key={id}
                //     timeout={500}
                //     classNames="hero">
                //     <HeroesListItem  {...props} onDelete={() => onDelete(id)}/>
                // </CSSTransition>
                <HeroesListItem  
                            key={id} 
                            {...props} 
                            onDelete={() => onDelete(id)}
                            />
            )
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        // <TransitionGroup component="ul">
        //     
        // </TransitionGroup>
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;


