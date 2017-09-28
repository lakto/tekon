import {JsonObject, JsonProperty} from 'json2typescript';

@JsonObject
export class Session {
    @JsonProperty('user', String)
    public user: string = undefined;

    @JsonProperty('time', String)
    public time: string = undefined;

    @JsonProperty('tries', Number)
    public tries: number = 0;
}
