import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto';
import { CreatePost } from './types/post.type';

@Injectable()
export class PostService {

    constructor(private readonly prisma: PrismaService){}

    async createPost(dto: CreatePostDto): Promise<CreatePost> {
        const redacteur = await this.prisma.utilisateur.findUnique({
            where: {
                id: dto.idRedacteur,
            },
            include: {
                role_utilisateur:{
                    select:{
                        id: true,
                    }
                }
            }
        })

        const redacteurExists = [2, 3].includes(redacteur?.role_utilisateur?.id)
        
        if(!redacteurExists){
            throw new ForbiddenException("Le redacteur sélectionné n'éxiste pas")
        }

        const categorieExists = await this.prisma.categorie_article.findUnique({
            where: {
                id: dto.idCategorie
            }
        })

        if(!categorieExists){
            throw new ForbiddenException("La catégorie sélectionnée n'éxiste pas")
        }
        
        const slug = dto.titre.toLocaleLowerCase().replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "").trim().split(" ").join("-");

        const slugExists = await this.prisma.article.findUnique({
            where: {
                slug
            }
        })


        if(slugExists){
            throw new ForbiddenException("Cet article existe déja")
        }

        return this.prisma.article.create({
            data: {
                idRedacteur: dto.idRedacteur,
                idCategorie: dto.idCategorie,
                titre: dto.titre,
                slug,
                description: dto.description,
                illustration: dto.illustration,
                contenu: dto.contenu,
                top: false,
                recommadee: false,
                isPublier: false
            }
        })
    }
}
