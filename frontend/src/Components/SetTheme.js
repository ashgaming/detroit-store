import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Dropdown,Nav } from 'react-bootstrap'
export default function SetTheme() {
  const colorTheme = useSelector(state=>state.colorTheme)

  const [theme, setTheme] = useState('blue')
//  const dispatch = useDispatch()
  return (

    <>
    <Dropdown as={Nav.Item}>
        <Dropdown.Toggle as={Nav.Link} variant="link">
          Select Theme
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onSelect={() => setTheme('red')}>Red</Dropdown.Item>
          <Dropdown.Item onSelect={() => setTheme('blue')}>Blue</Dropdown.Item>
          <Dropdown.Item onSelect={() => setTheme('black')}>Dark</Dropdown.Item>
          <Dropdown.Item onSelect={() => setTheme('white')}>White</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <div>
      </div>
    </>


  )
}