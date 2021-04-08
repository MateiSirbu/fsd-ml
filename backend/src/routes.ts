import { UserController } from "./controller/UserController";
import { ClassificationController } from "./controller/ClassificationController";

export const Routes = [
    {
        method: "post",
        route: "/login",
        controller: UserController,
        action: "login",
        guard: false
    }, {
        method: "post",
        route: "/signup",
        controller: UserController,
        action: "signUp",
        guard: false
    }, {
        method: "get",
        route: "/history",
        controller: ClassificationController,
        action: "getAllEntries",
        guard: true
    }, {
        method: "get",
        route: "/history/{id}",
        controller: ClassificationController,
        action: "getOneEntry",
        guard: true
    }, {
        method: "delete",
        route: "/history/{id}",
        controller: ClassificationController,
        action: "deleteEntry",
        guard: true
    }, {
        method: "get",
        route: "/evaluate",
        controller: ClassificationController,
        action: "evaluate",
        guard: true
    }, {
        method: "post",
        route: "/classify",
        controller: ClassificationController,
        action: "classify",
        guard: true
    }
];