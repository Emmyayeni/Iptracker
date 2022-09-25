import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Search from './Search';
import '../App.css';

import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvents } from 'react-leaflet'

export default function Home() {
  const [datab, setdata] = useState([])
  const [Location, setlocation] = useState([])
  const [search, setsearch] = useState()
  const [ipaddress, setaddress] = useState()
  const navigate = useNavigate()
  async function fetchapi() {
    await fetch('http://edns.ip-api.com/json').then((address) => address.json())
      .then(result => {
        console.log(result)
        for (var i in result) {
          setaddress(result[i]);
          console.log(result[i])
        }
      })
  }
  async function get() {
    console.log(ipaddress.ip)
    await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_mdNSZ14Oir0SloNb9nh5WXLcx2B6x&ipAddress=${ipaddress.ip}`)
      .then((data) => data.json())
      .then(result => {
        console.log(result)
        setdata(result)
        setlocation(result.location);
        console.log(result)
        console.log(result.location.city)
      })
  }

  function LocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })

    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }
  const handletext = (e) => {
    const value = e.target.value;
    console.log(value)
    setsearch(value);

  }
  const handlesubmit = () => {
    navigate(`/user/${search}`)
  }
  useEffect(() => {
    fetchapi();
    get();
  }, []);
  return (
    // <div>
    //   {datab.map((country)=>{
    //     return (
    <div class="container">
      <div class="nav">
        <h1 class="title">IP Address Tracker</h1>
        <form action="" class="search" onSubmit={handlesubmit}>
          <input type="text" placeholder=" Search for any IP address or domain" onChange={handletext} />
          <button type='submit'><img src="./images/icon-arrow.svg" alt="" /></button>
        </form>
      </div>
      <div class="info">
        <div class="ip-address">
          IP ADDRESS
          <h2>{datab.ip}</h2>
        </div>
        <div class="line"></div>
        <div class="location">
          LOCATION
          <h2>{Location.city}<span>10001</span></h2>
        </div>
        <div class="line"></div>
        <div class="timezone">
          TIMEZONE
          <h2>{Location.timezone}</h2>
        </div>
        <div class="line"></div>
        <div class="isp">
          ISP
          <h2>{datab.isp}</h2>
        </div>

      </div>
      <MapContainer
        center={{ lat: 51.505, lng: -0.09 }}
        zoom={13}
        scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
      </MapContainer>
    </div>

  )
  // })
  //      }



  //     </div>)
}
