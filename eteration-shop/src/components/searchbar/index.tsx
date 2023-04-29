import React, { useEffect, useRef, useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router-dom';

function SearchBar() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [filter, setFilter] = useState("");
    const [search, setSearch] = useState('');

    useEffect(()=>{
        searchParams.set('search',search);

        if(!search){
            searchParams.delete('search')
        }
        setSearchParams(Object.fromEntries(searchParams))
    },[search])


    const handleSearch = (e:any) => {
        setSearch(e.target.value);
    };
  
    return (
        <Form onSubmit={e => { e.preventDefault(); }}>
            <FormControl type="text" placeholder = "Search" className="mr-sm-2" onChange={handleSearch} defaultValue={search} />
        </Form>
    );
}

export default SearchBar;
