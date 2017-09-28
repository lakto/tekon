import {JsonObject, JsonProperty} from 'json2typescript';

@JsonObject
export class Users {
    @JsonProperty('kader', String)
    public kader: string = undefined;
}
