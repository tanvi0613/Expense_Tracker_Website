import React, { useState } from 'react'
import './Dashboard.css'
import ele3 from '../../img/ele3.png';
import TopNav from '../../components/TopNav/TopNav'
import Navigation from '../../components/Navigation/Navigation'

function Dashboard() {

    const [active, setActive] = useState(1);

    return (
        <section className='dashboard'>
            <img src={ele3} alt='ele3' className='ele3' />
            <div className='navigations'>
                <TopNav/>
                <Navigation active={active} setActive={setActive}/>
            </div>
        </section>
    )
}

export default Dashboard
