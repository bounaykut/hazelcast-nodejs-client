/* tslint:disable */
import ClientMessage = require('../ClientMessage');
import {BitsUtil} from '../BitsUtil';
import Address = require('../Address');
import {AddressCodec} from './AddressCodec';
import {MemberCodec} from './MemberCodec';
import {Data} from '../serialization/Data';
import {EntryViewCodec} from './EntryViewCodec';
import DistributedObjectInfoCodec = require('./DistributedObjectInfoCodec');
import {SetMessageType} from './SetMessageType';

var REQUEST_TYPE = SetMessageType.SET_ISEMPTY;
var RESPONSE_TYPE = 101;
var RETRYABLE = false;


export class SetIsEmptyCodec{



static calculateSize(name : string ){
// Calculates the request payload size
var dataSize : number = 0;
            dataSize += BitsUtil.calculateSizeString(name);
return dataSize;
}

static encodeRequest(name : string){
// Encode request into clientMessage
var clientMessage = ClientMessage.newClientMessage(this.calculateSize(name));
clientMessage.setMessageType(REQUEST_TYPE);
clientMessage.setRetryable(RETRYABLE);
    clientMessage.appendString(name);
clientMessage.updateFrameLength();
return clientMessage;
}

static decodeResponse(clientMessage : ClientMessage,  toObjectFunction: (data: Data) => any = null){
// Decode response from client message
var parameters :any = { 'response' : null  };
                    parameters['response'] = clientMessage.readBoolean();
return parameters;

}


}
