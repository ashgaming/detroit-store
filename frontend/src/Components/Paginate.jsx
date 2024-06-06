import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer} from 'react-router-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

export default function Paginate({ pages, page, keyword = '', isAdmin = false }) {
    const history = useNavigate();
    if(keyword){
        keyword = keyword.split('?keyword=')[1].split('&')[0]
    }

    const handlePageChange = (page) => {
        history(`/?keyword=${keyword}&page=${page}`);
    };
    return (
        pages > 1 && (
            <Pagination style={{
                margin:'10px',
                padding:'10px'
            }}>
                {[...Array(pages).keys()].map((x) => (
                   <LinkContainer
                   key={x + 1} 
                   to={ !isAdmin ? 
                    { pathname: '/', search: `?keyword=${keyword}&page=${x + 1}` } :
                    { pathname: '/admin/productlist', search: `?keyword=${keyword}&page=${x + 1}` } 

                }
                   onClick={() => handlePageChange(x + 1)}
               >
                        <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
                    </LinkContainer>
                ))}

            </Pagination>
        )
    )
}
