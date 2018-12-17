class Document < ApplicationRecord
  has_one_attached :file
  belongs_to :account
  validates :file, presence: true
  validates :fileName, presence: true

  def getAllMyDocuments idAccount
    Document.find_by_sql(['SELECT  "documents".* FROM "documents" WHERE "documents"."account_id" = ?', idAccount])
  end

  def correct_file nameFile, fileImport
    confirmation = false
      if fileImport.content_type.in?(%w(application/msword application/pdf application/vnd.openxmlformats-officedocument.wordprocessingml.document))
        puts ">>> El content_type es correcto"
        if !fileImport.content_type.in?("application/pdf")
          if fileImport.content_type.in?("application/msword")
            file.attach(io: fileImport, filename: nameFile + ".doc")
          else
            file.attach(io: fileImport, filename: nameFile + ".docx")
          end
        else
          file.attach(io: fileImport, filename: nameFile + ".pdf")
        end
        confirmation = true
      end

    return confirmation
  end
end
