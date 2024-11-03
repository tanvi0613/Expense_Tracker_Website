import React, { useState } from 'react'
import './Dashboard.css'
import ele3 from '../../img/ele3.png';
import TopNav from '../../components/TopNav/TopNav'
import Navigation from '../../components/Navigation/Navigation'
import TransactionList from '../Transactions/TransactionList';
import TransactionChart from '../Transactions/TransactionChart';


function Dashboard() {

    const [active, setActive] = useState(1);

    return (
        <section className='dashboard'>
            <img src={ele3} alt='ele3' className='ele3' />
            <div className='navigations'>
                <TopNav/>
                <Navigation active={active} setActive={setActive}/>
            </div>
            <div className='chart-display'>
                <TransactionChart />
            </div>
            <div>
                <TransactionList />
            </div>
        </section>
    )
}

export default Dashboard
