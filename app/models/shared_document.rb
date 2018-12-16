class SharedDocument < ApplicationRecord
  belongs_to :document
  belongs_to :account

  def getMySharedDocuments idAccount
    SharedDocument.find_by_sql(["SELECT  `shared_documents`.* FROM `shared_documents` WHERE `shared_documents`.`account_id` = ?", idAccount])
  end

  def getAccountsIDSharedWithThisDocument idDocument
    result = []
    sharedAccountByDocumment = SharedDocument.find_by_sql(["SELECT  `shared_documents`.* FROM `shared_documents` WHERE `shared_documents`.`document_id` = ?", idDocument])
    sharedAccountByDocumment.each do |shareDocument|
      result.push(shareDocument.account.id)
    end
    return result
  end

  def getAccountsSharedWithThisDocument idDocument
    SharedDocument.find_by_sql(["SELECT  `shared_documents`.* FROM `shared_documents` WHERE `shared_documents`.`document_id` = ?", idDocument])
  end

end
