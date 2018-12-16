class HomeController < ApplicationController
  def index
    session[:conversations] ||= []

    @accounts = Account.all.where.not(id: current_account)
    @conversations = Conversation.includes(:recipient, :messages)
                         .find(session[:conversations])
    if account_signed_in?
      numAccount = current_account
      @documents = Document.new.getAllMyDocuments(numAccount.id)
    end
  end
end
