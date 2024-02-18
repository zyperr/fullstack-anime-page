import '../styles/components/headerSection.css';


function HeaderSection(){
    return (
        <header className='header-section'>
            <nav className='header-section__nav'>
                <ul className='nav__list'>
                    <li className='nav__list-li'>Animes</li>
                    <li className='nav__list-li'>Manga</li>
                    <li className='nav__list-li'>Manhwas</li>
                    <li className='nav__list-li'>Manhua</li>
                    <li className='nav__list-li'>Novela</li>
                </ul>
            </nav>
        </header>
    )
}


export {HeaderSection};