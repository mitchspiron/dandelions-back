import { CreateResponseDto, UpdateResponseDto } from './dto';
import { ResponseService } from './response.service';
import { Response } from './types';
export declare class ResponseController {
    private readonly responseService;
    constructor(responseService: ResponseService);
    createResponse(id: number, dto: CreateResponseDto): Promise<Response>;
    getResponseByComment(id: number): Promise<Response[]>;
    getResponseById(id: number): Promise<Response>;
    updateResponseById(id: number, dto: UpdateResponseDto): Promise<Response>;
    deleteResponseById(id: number): Promise<Response>;
}
