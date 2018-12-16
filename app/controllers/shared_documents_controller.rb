class SharedDocumentsController < ApplicationController
  before_action :authenticate_account!
  def create
    @sharedocument = SharedDocument.new
    @sharedocument.document = Document.find(params[:idDocument])
    @sharedocument.account = Account.find(params[:idAccount])
    @sharedocument.save!
  end
  def index
    session[:conversations] ||= []

    @accounts = Account.all.where.not(id: current_account)
    @conversations = Conversation.includes(:recipient, :messages)
                         .find(session[:conversations])
    @sharedocuments = SharedDocument.new.getMySharedDocuments(current_account.id)
  end
  def new
    session[:conversations] ||= []

    @accounts = Account.all.where.not(id: current_account)
    @conversations = Conversation.includes(:recipient, :messages)
                         .find(session[:conversations])

    accountIDShared = SharedDocument.new.getAccountsIDSharedWithThisDocument(params[:id])
    @document = Document.find(params[:id])
    @accountsBag = []
    accounts = Account.new.getAccounts(current_account)
    accounts.each do |account|
      if !accountIDShared.include?(account.id)
        @accountsBag.push(account)
      end
    end
  end
end
