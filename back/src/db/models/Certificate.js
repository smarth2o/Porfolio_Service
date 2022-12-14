import { CertificateModel } from "../schemas/certificate";

class Certificate {
  static async create({ newCerti }) {
    const createdNewCerti = await CertificateModel.create(newCerti);
    return createdNewCerti;
  }

  // static async findByEmail({ email }) {
  //   const education = await EducationModel.findOne({ email });
  //   return education;
  // }

  static async findById({ certificate_id }) {
    const certi = await CertificateModel.findOne({ certiId: certificate_id });
    return certi;
  }

  static async findByUserId({ user_id }) {
    const certi = await CertificateModel.find({ id: user_id });
    return certi;
  }

  static async update({ certificate_id, fieldToUpdate, newValue }) {
    const filter = { certiId: certificate_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updateCerti = await CertificateModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updateCerti;
  }

  //주가기능 삭제
  static async deleteOne({ certificate_id }) {
    const certi = await CertificateModel.deleteOne({ certiId: certificate_id });
    return certi;
  }
}

export { Certificate };
