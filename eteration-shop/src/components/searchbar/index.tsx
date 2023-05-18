import React, { useEffect, useRef, useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router-dom';

function SearchBar() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState('');

    useEffect(()=>{
        searchParams.set('search',search);

        if(!search){
            searchParams.delete('search')
        }
        setSearchParams(Object.fromEntries(searchParams))
    },[search]);

    useEffect(()=>{
        console.log(searchParams.get('search'));
        if(!searchParams.get('search')){
            setSearch('');
        };
    },[searchParams]);


    const handleSearch = (e:any) => {
        setSearch(e.target.value);
    };
  
    return (
        <Form style={{width:'100%',height:'100%'}} onSubmit={e => { e.preventDefault(); }}>
            <FormControl  style={{width:'100%',height:'100%',borderRadius:15}} type="text"
             placeholder = "Search" className="mr-sm-2" onChange={handleSearch} defaultValue={search} />
        </Form>
    );
}

export default SearchBar;
