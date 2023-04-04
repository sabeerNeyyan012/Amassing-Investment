import React, { useState, useRef, useEffect } from 'react';
import { List, ListItem, ListItemText, Typography } from '@material-ui/core';
import KImg from '../../Common/Images/⌘Kb.png';
import SearchBImg from '../../Common/Images/search-b.png';
import InvexRoutes from '../../../InvexRoutes';
import { ClickAwayListener } from '@mui/material'

const NewSearch = ({
  navbarSearch,
  handleSearch,
  handleClick,
  SearchResult,
  setSearchResult
}) => {
  const [clearSearchText, setClearSearchText] = useState(false)
  const searchInputRef = useRef()

  useEffect(() => {
    if (clearSearchText === true) {
      searchInputRef.current.value = ''
    }
  }, [clearSearchText])

  const hideSearchResult = () => {
    setSearchResult(null)
    setClearSearchText(true)

    setTimeout(() => {
      setClearSearchText(false)
    }, 500)
  }

  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        className='form-group search-blk me-auto ms-5'
        role='search'
        method='get'
        id='searchform'
        action
      >
        <div className='input-group'>
          <input
            type='text'
            ref={searchInputRef}
            value={navbarSearch}
            onChange={(e) => handleSearch(e.target.value)}
            name='s'
            className='form-control search-input'
            placeholder='Search for symbol'
            id='example-search-input'
            autoComplete='off'
          />
          <input
            type='submit'
            defaultValue='Search'
            id='search-submit'
            style={{ display: 'none' }}
          />
          <span className='input-group-append d-flex align-items-center'>
            <a href>
              <p>
                <img src={KImg} />
              </p>
            </a>
            <label htmlFor='search-submit'>
              <img
                src={SearchBImg}
                alt='search-icon'
                className='img-fluid'
                height={16}
                width={16}
              />
            </label>
          </span>
        </div>

        {SearchResult && SearchResult.length > 0 && (
          <ClickAwayListener
            onClickAway={() => {
              hideSearchResult()
            }}
          >
            <List
              className='search-result'
              sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            >
              {SearchResult &&
                SearchResult.length > 0 &&
                SearchResult.map((list, i) => {
                  return (
                    <ListItem
                      key={i}
                      alignItems='flex-start'
                      onClick={() => {
                        handleClick(
                          `${InvexRoutes.Symbol.path.replace(
                            ':symbol',
                            list.symbol
                          )}`
                        )
                        setClearSearchText(true)

                        setTimeout(() => {
                          setClearSearchText(false)
                        }, 500)
                      }}
                    >
                      <ListItemText
                        primary={list.symbol + ' - ' + list.name}
                        secondary={
                          <>
                            <Typography
                              sx={{ display: 'inline' }}
                              component='span'
                              variant='body2'
                              color='text.primary'
                            >
                              {list.stockExchange}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                  )
                })}
            </List>
          </ClickAwayListener>
        )}
      </form>
    </>
  )
}

export default NewSearch;
