import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

export default function PositionDemo() {
    const navigate = useNavigate()
    const [visibleRight, setVisibleRight] = useState(false);
    
    const navigateToBranch = () => {
        navigate("/Branch")
    };

    return (
        <div className="card1">
            <div className="flex gap-2 justify-content-center">
                <Button icon="pi pi-comments" onClick={() => setVisibleRight(true)} /> 
            </div>

            <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)}>
                <h2>נשמח שנהיה בקשר</h2>
                <p>
                    <div><Button icon="pi pi-phone" /><Button style={{marginLeft:'15px', opacity:'0.7'}}>*670</Button> </div>
                    <div style={{marginTop:'10px'}}><Button icon="pi pi-envelope" /><Button style={{opacity:'0.7',marginLeft:'15px'}}>katzefet@gmail.com</Button> </div>
                    <div style={{marginTop:'10px'}}><Button icon="pi pi-map-marker" />
                    <Button style={{marginLeft:'15px', opacity:'0.7'}} onClick={navigateToBranch}>לסניפים שלנו</Button></div> 
                </p>
            </Sidebar>

        </div>
    )
}