import { AwardModel } from "../schemas/award";

class Award {

    static async create({ newAward }) {
        console.log(newAward);
        const checkAlreadyExist = await AwardModel.findOne({
            award : newAward.award
        });
        if (checkAlreadyExist) {
            return checkAlreadyExist;
        }
        const createdNewAward = await AwardModel.create(newAward);
        return createdNewAward;
    }

    static async delete({ deleteAward }) {
        console.log("delete");
        console.log(deleteAward);
        const deleteAwardResult = await AwardModel.deleteOne({ 
            id : deleteAward.id,
            user_id : deleteAward.user_id 
        });
        return deleteAwardResult;

    }

    static async findAllUser({ getAward }) {
        console.log("findAll");
        console.log(getAward);
        const awards = await AwardModel.find({ 
<<<<<<< HEAD
            id : getAward.id, 
=======
            user_id : getAward.user_id,
>>>>>>> 60aa5e4764713b28ad4d740e2c944f38f9bb3374
        });
        return awards;
    }

    static async findOne({ getAward }) {
        const award = await AwardModel.findOne({
            id : getAward.id,
        })
        return award;
    }

    static async update({ updateAward }) {
        console.log(updateAward);
        const filter = { 
            id : updateAward.id ,
        };
        const update = {
            award : updateAward.changeAward,
            description : updateAward.changeDescription
        };
        const option = { returnOriginal: false };

        const updatedAward = await AwardModel.findOneAndUpdate(
            filter,
            update,
            option
        );

        return updatedAward;
    }
}

export { Award };
