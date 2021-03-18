import { UserController} from "./controller/UserController";
import { DessertController} from "./controller/DessertController";

export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, {
    method: "post",
    route: "/login",
    controller: UserController,
    action: "login"
}, {
    method: "post",
    route: "/signup",
    controller: UserController,
    action: "signUp"
    },
{
    method: "get",
    route: "/desserts",
    controller: DessertController,
    action: "getAllDesserts"
}, {
    method: "get",
    route: "/desserts/{id}",
    controller: DessertController,
    action: "getOneDessert"
}, {
    method: "post",
    route: "/desserts",
    controller: DessertController,
    action: "createDessert"
},{
    method: "delete",
    route: "/desserts/{id}",
    controller: DessertController,
    action: "deleteDessert"
    },
];