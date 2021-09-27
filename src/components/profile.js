import React, { useState } from 'react'
import { useLocation } from "react-router-dom"
import Handle from '../components/Handle'
import Contests from '../components/contests'

export default function Profile() {
    //const [cfHandle, setCfHandle]
    let location = useLocation()
    let profile = location.state;
    if (!profile || !profile.foundFlag) {
        console.log('handle not found');
        window.location.href = '/'
        return (
            <div>
                <h1>Handle not found</h1>
            </div>
        )
    }


    let name = '', address = '', email = '', rating = '', rank = '', org = '', maxRating = '';
    if (profile.firstName) { name += profile.firstName + ' ' }
    if (profile.lastName) { name += profile.lastName }

    if (profile.city) { address += profile.city + ', ' }
    if (profile.country) { address += profile.country }

    if (profile.email) { email += profile.email }

    if (profile.rating) { rating += profile.rating }

    if (profile.rank) { rank += profile.rank }

    if (profile.org) { org += profile.org }

    if (profile.maxRating) { maxRating += profile.maxRating }

    let p_color = 'black';
    if (rank === 'newbie') { p_color = 'gray' }
    if (rank === 'pupil') { p_color = 'green' }
    if (rank === 'specialist') { p_color = '#03a89e' }
    if (rank === 'expert') { p_color = 'blue' }
    if (rank === 'candidate master') { p_color = 'purple' }
    if (rank === 'master' || rank === 'international master') { p_color = 'orange' }
    if (rank === 'grandmaster') { p_color = 'red' }
    if (rank === 'international grandmaster') { p_color = 'red' }
    if (rank === 'legendary grandmaster') { p_color = 'red' }



    return (
        <div>
            <center>
                <Handle rank={rank} handleName={profile.hndl} />
                <div className='cf_profile_card container'>
                    <img src={profile.picture} width='130' />
                    <h1>{name}</h1>
                    <font color={p_color} size='5'><b>{rank ? rank : 'User is unrated'}</b></font><hr />
                    <div>
                        <b>{rating ? 'Current rating:' : ''}</b> <b><font color={p_color}>{rating}</font></b> {rating ? <br /> : ''}
                        <b>{maxRating ? 'Maximum rating:' : ''}</b> {maxRating} {maxRating ? <br /> : ''}
                        <b>{email ? 'Email:' : ''}</b> {email} {email ? <br /> : ''}
                        <b>{address ? 'Address:' : ''}</b> {address} {address ? <br /> : ''}
                        <b>{org ? 'Institute:' : ''}</b> {org} {org ? <br /> : ''}
                    </div>
                </div>
                <Contests handle={profile.hndl} />
            </center>
        </div>
    )
}
