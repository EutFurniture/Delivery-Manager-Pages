import { BrowserRouter as Router, Route, Switch, Link, useParams } from "react-router-dom";

import DeliveryInfo from './DeliveryInfo'

const DeliveryInfoRoute=()=>{
    return(
        <div>
            <Switch>
                <Route path="/DeliveryInfoRoute/:order_id">
                    <DeliveryInfo/>
                </Route>
            </Switch>
        </div>
    )
}

export default DeliveryInfoRoute;