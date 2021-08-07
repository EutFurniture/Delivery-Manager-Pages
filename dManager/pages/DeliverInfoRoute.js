import { BrowserRouter as Router, Route, Switch, Link, useParams } from "react-router-dom";

import DeliverInfo from './DeliverInfo'

const DeliverInfoRoute=()=>{
    return(
        <div>
            <Switch>
                <Route path="/DeliverInfoRoute/:employee_id">
                    <DeliverInfo/>
                </Route>
            </Switch>
        </div>
    )
}

export default DeliverInfoRoute;