export const lang = {
  general: {
    homeLink: 'Home',
    menuLink: 'Menu',
    star: '*',
    grossTaxInformation: 'Prices incl. VAT plus shipping costs',
    netTaxInformation: 'Prices excl. VAT plus shipping costs',
    deliveryShippingFree: 'Free shipping',
    deliveryNotAvailable: 'These options are currently not available.',
    deliveryShipping: 'This product will be released on',
    deliveryPartialStock: 'Only %inStock% of %quantity% in stock',
    deliveryPartialStockAddon:
      '- Estimated delivery time (product out of stock): %shippingTime% workdays',
    deliveryInStock: 'Ready to ship, estimated delivery time: 1-3 workdays',
    deliveryShippingTime: 'Estimated delivery time: %shippingTime% workdays',
    deliveryShippingDelay: 'Estimated delivery time: 5 workdays',
    offcanvasCloseMenu: 'Close menu',
    noscriptNotice:
      'To be able to use the full range of Shopware 6, we recommend activating Javascript in your browser.',
    toCategory: 'Show all',
    readMore: 'Read more',
    mainMenu: 'Show all categories',
    closeMenu: 'Close menu',
    back: 'Back',
    categories: 'Categories',
    showCategory: 'Show %category%',
    required: '*',
    requiredFields: 'Fields marked with asterisks (*) are required.',
    privacyTitle: 'Privacy',
    privacyNotice:
      'I have read the <a data-toggle="modal" data-url="%url%" href="%url%" title="Data protection information">data protection information</a>.',
    privacyLink: 'Privacy policy',
    imprintLink: 'Imprint',
    '404ErrorPageHeader': 'Page not found',
    '404ErrorDescription':
      "We are sorry, the page you're looking for could not be found. It may no longer exist or may have been moved.",
    '404ErrorReturn': 'Back to homepage',
    maintenanceModeHeader: 'Maintenance mode',
    maintenanceModeDescription:
      'We are currently updating this site. Please check back later.',
    sortingLabel: 'Sorting',
    next: 'Next',
    previous: 'Previous',
    formSubmit: 'Submit',
  },
  header: {
    logoLink: 'Go to homepage',
    searchButton: 'Search',
    searchPlaceholder: 'Search all categories...',
    searchAllResults: 'Show all search results',
    searchResults: '{1} 1 Result|]1,Inf[ %count% Results',
    supportInfo:
      '<strong>Questions regarding your order?</strong><br /><strong><a href="tel:+4912345-123456789">12345-123456789</a></strong> <small>Daily from 7:30 am to 10:00 pm</small>',
    indexLinkService: 'Service/help',
    searchNoResult: 'No results found.',
    wishlist: 'Wishlist',
  },
  error: {
    'VIOLATION::IS_BLANK_ERROR': '%field% should not be empty.',
    'VIOLATION::TOO_LOW_ERROR': '%field% should not be empty.',
    'VIOLATION::STRICT_CHECK_FAILED_ERROR': '%field% is invalid',
    'VIOLATION::CUSTOMER_EMAIL_NOT_UNIQUE':
      'This email address has already been registered.',
    'VIOLATION::CUSTOMER_PASSWORD_NOT_CORRECT': 'Password incorrect.',
    'message-default': 'Unfortunately, something went wrong.',
    'message-404': 'The requested page cannot be found.',
    addToCartError:
      'An error occurred while trying to add items to the shopping cart.',
    FRAMEWORK__INVALID_UUID: 'The selected payment method does not exist.',
    CHECKOUT__UNKNOWN_PAYMENT_METHOD:
      'The selected payment method does not exist.',
    productNotFound: 'Product "%number%" not found.',
    'payment-method-blocked': 'Payment via %name% not available.',
    'shipping-method-blocked': '%name% shipping is not available.',
    'shipping-address-blocked':
      'Shipping to the selected address is not possible.',
    'shipping-address-invalid':
      'The selected shipping address is not valid or incomplete. Please check your entries.',
    'billing-address-blocked':
      'Billing to the selected address is not possible.',
    'billing-address-invalid':
      'The selected billing address is not valid or incomplete. Please check your entries.',
    'VIOLATION::TOO_SHORT_ERROR': '%field% is too short.',
    'product-not-found': 'The product could not be found.',
    'message-403-ajax':
      'Your session has expired. Please reload the page and try again.',
    'message-403':
      'Your session has expired. Please return to the last page and try again.',
    'product-out-of-stock': '%name% is not available at the moment.',
    'auto-promotion-not-found': 'Promotion "%name%" was no longer valid!',
  },
  account: {
    externalPaymentCanceled:
      'We received your order, but the payment was aborted. Please change your payment method or try again',
    externalPaymentFailure:
      'We received your order, but we were not able to process your payment, please change the payment method or try again',
    confirmationIsAlreadyDone:
      'Either the email address has already been confirmed or the URL is invalid.',
    doubleOptInMailConfirmationSuccessfully:
      'Thank you for confirming your email address! You can now complete your order.',
    doubleOptInRegistrationSuccessfully:
      'Thank you for signing up! Your account has been successfully unlocked.',
    myAccount: 'My account',
    registerTitle: 'Sign up',
    loginHeader: "I'm a customer already",
    loginFormDescription: 'Log in with email address and password',
    loginMailLabel: 'Your email address',
    loginMailPlaceholder: 'Email address',
    loginPasswordLabel: 'Your password',
    loginPasswordPlaceholder: 'Password',
    loginPasswordRecover: 'I have forgotten my password.',
    loginSubmit: 'Login',
    loginBadCredentials:
      'Could not find an account that matches the given credentials.',
    registerAdvantagesHeader: 'Login advantages:',
    registerAdvantage1: 'Express shopping',
    registerAdvantage2: 'Save your data and settings',
    registerAdvantage3: 'Order overview and shipping information',
    registerAdvantage4: 'Manage your newsletter subscription',
    registerPersonalHeader: "I'm a new customer",
    registerAddressBillingHeader: 'Your address',
    registerAddressShippingHeader: 'Alternative shipping address',
    personalTypeLabel: 'I am',
    personalTypePrivate: 'Private',
    personalTypeBusiness: 'Commercial',
    personalSalutationLabel: 'Salutation',
    personalSalutationPlaceholder: 'Enter salutation...',
    personalTitleLabel: 'Title',
    personalTitlePlaceholder: 'Enter title...',
    personalFirstNameLabel: 'First name',
    personalFirstNamePlaceholder: 'Enter first name...',
    personalLastNameLabel: 'Last name',
    personalLastNamePlaceholder: 'Enter last name...',
    personalMailLabel: 'New email address',
    personalMailPlaceholder: 'Enter new email address...',
    personalMailConfirmationLabel: 'Email confirmation',
    personalMailConfirmationPlaceholder:
      'Please enter your email address once again...',
    personalMailConfirmationInvalidMessage: 'Email addresses do not match.',
    personalPasswordLabel: 'Password',
    personalPasswordPlaceholder: 'Enter password...',
    personalPasswordConfirmationLabel: 'Password confirmation',
    personalPasswordConfirmationPlaceholder:
      'Please enter your password once again...',
    personalPasswordConfirmationInvalidMessage:
      'The passwords you have entered do not match.',
    personalPasswordDescription:
      'Passwords must have a minimum length of %minLength% characters.',
    personalBirthdayLabel: 'Date of birth',
    personalBirthdaySelectDay: 'Day',
    personalBirthdaySelectMonth: 'Month',
    personalBirthdaySelectYear: 'Year',
    personalPhoneLabel: 'Phone',
    personalPhonePlaceholder: 'Enter phone number...',
    registerDifferentShipping: 'Shipping and billing address do not match.',
    registerSubmit: 'Continue',
    overviewTitle: 'Overview',
    greetings: 'Hello, ',
    overviewLink: 'Overview',
    profileLink: 'Your profile',
    addressLink: 'Addresses',
    paymentSuccess: 'Payment method has been changed.',
    paymentLink: 'Payment methods',
    ordersLink: 'Orders',
    profileTitle: 'Your profile',
    profileText: 'Check your personal data.',
    addressTitle: 'Addresses',
    paymentTitle: 'Payment methods',
    paymentText:
      'View all available payment methods and select a default payment method.',
    ordersTitle: 'Orders',
    logout: 'Logout',
    guestAbort: 'Close guest session',
    logoutSucceeded: 'Successfully logged off.',
    overviewInfo:
      'Directly access your profile information, the default payment method and given addresses.',
    overviewProfileHeader: 'Personal data',
    overviewPaymentHeader: 'Default payment method',
    overviewBillingHeader: 'Default billing address',
    overviewShippingHeader: 'Default shipping address',
    overviewAddressEqual: 'Equal to billing address',
    overviewChangePayment: 'Change payment method',
    overviewChangeProfile: 'Edit profile',
    overviewChangeBilling: 'Change billing address',
    overviewChangeShipping: 'Change shipping address',
    overviewNewestOrderHeader: 'Last order',
    overviewCustomerGroupRequest:
      'Access to customer group "%group%" requested.',
    paymentChangeSubmit: 'Change',
    profilePersonalTitle: 'Personal data',
    profileMailTitle: 'Email address',
    profileCurrentMail: 'Email address:',
    profilePasswordTitle: 'Password',
    profileUpdateSuccess: 'Profile has been updated.',
    profileChangeEmail: 'Change email address',
    profileChangePassword: 'Change password',
    profileConfirmPassword:
      'Please enter your current password again to confirm changes.',
    profileCredentialsTitle: 'Login data',
    orRegister: 'or',
    orRegisterLink: 'sign up',
    emailChangeSuccess: 'Your email address has been updated.',
    emailChangeNoSuccess: 'Email address could not be changed.',
    passwordChangeSuccess: 'Your password has been updated.',
    passwordChangeNoSuccess: 'Password could not be changed.',
    passwordHashNotFound: 'The password reset link seems to be invalid.',
    passwordHashExpired:
      'The password reset link is no longer valid. Please request a new one.',
    recoveryMailSend:
      ' If the provided email address is registered, a confirmation email including a password reset link has been sent.',
    profilePasswordCreateNew: 'New password',
    profilePasswordCurrent: 'Current password',
    profileRecoverPasswordTitle: 'Password recovery',
    profileRecoverPasswordInfo:
      'We will send you a confirmation email. Click the link in that email in order to change your password.',
    profileRecoverPasswordSubmit: 'Send email',
    profileSaveChanges: 'Save changes',
    profileDelete:
      '<a href="%target%" data-toggle="modal" data-target="%target%">Click here</a> to delete all your personal data',
    profileDeleteAlert:
      "After deleting your customer account personal data, newsletter entries and reviews won't be accessible to you anymore. Note that records of all orders will be kept nonetheless in order to fulfill legal regulations.",
    profileDeleteConfirm: 'Do you really want to delete your customer account?',
    profileDeleteModalTitle: 'Customer account',
    profileDeleteButton: 'Delete account',
    profileDeleteSuccessAlert: 'Your customer account was deleted.',
    addressWelcome: 'Addresses',
    addressText: 'View your current default addresses or add new ones.',
    addressListHeader: 'All addresses',
    addressesTitleDefaultShippingAddress: 'Default shipping address',
    addressesTitleDefaultBillingAddress: 'Default billing address',
    addressesSetAsDefaultShippingAction: 'Set as default shipping address',
    addressesSetAsDefaultBillingAction: 'Set as default billing address',
    addressesTitleCurrentShippingAddress: 'Currently shipping to',
    addressesTitleCurrentBillingAddress: 'Currently billing',
    addressesContentItemActionEdit: 'Edit',
    addressesContentItemActionDelete: 'Delete',
    availableAddresses: 'Available addresses',
    selectAddress: 'Select address',
    addressCreateBtn: 'Add address',
    addressEditBtn: 'Edit address',
    addressCreateWelcome: 'Create a new address',
    addressEditWelcome: 'Change address',
    addressSaveChange: 'Save address',
    addressDeleted: 'Address has been deleted.',
    addressNotDeleted: 'Address could not be deleted.',
    addressDefaultChanged: 'Default address has been changed.',
    addressDefaultNotChanged: 'Default address could not be changed.',
    addressSaved: 'Address has been saved.',
    inactiveAccountAlert:
      'Your customer account has not been activated yet. We have sent a confirmation email containing an activation link. Please check your inbox and click the link to complete the registration!',
    optInGuestAlert:
      'Thank you for your interest! You will receive a confirmation email shortly. Click on the link in it to confirm your email address.',
    optInRegistrationAlert:
      'Thank you for signing up! You will receive a confirmation email shortly. Click on the link in it to complete the registration.',
    optInSuccessAlert: 'We just sent you a confirmation email.',
    ordersWelcome: 'Your recent orders:',
    ordersInfoEmpty: 'You have not ordered yet.',
    orderHeadline: 'Order:',
    orderStatus: 'Status:',
    orderStatusActionRequired: 'Action required',
    orderStatusActionCompletePayment: 'Complete payment',
    orderShippingStatus: 'Shipping status',
    orderPaymentStatus: 'Payment status',
    orderPaymentMethod: 'Payment method',
    orderShippingMethod: 'Shipping method',
    orderItemColumnDate: 'Date',
    orderContextMenuChangePayment: 'Change payment method',
    orderContextMenuReorder: 'Repeat order',
    orderContextMenuCancel: 'Cancel order',
    completePayment: 'Complete Payment',
    editOrder: 'Edit order',
    editOrderUpdateButton: 'Complete payment',
    editOrderBackToAccountButton: 'Back to overview',
    editOrderBackToOrderButton: 'Back to order',
    editOrderCancelOrderButton: 'Cancel order',
    editOrderCancelOrderModalHeader: 'Cancel order',
    editOrderCancelOrderModalBodyText:
      'Beware, if you decide to ultimately cancel your order, the associated payment method and all applied promotions will be lost!',
    editOrderCancelOrderModalBodyQuestion:
      'Are you sure you want to cancel your order after all?',
    editOrderCancelOrderModalFooterButton: 'Cancel order',
    editOrderCancelOrderModalFooterButtonBack: 'Back',
    editOrderPaymentNotChangeable:
      'Unable to change the current payment method! There is a rebate or similar promotional benefit tied to the payment method that would be lost on change. Please cancel your order and reorder.',
    orderNumber: 'Order number:',
    orderItemColumnNumber: 'Order number:',
    orderItemColumnPaymentMethod: 'Payment method',
    orderItemColumnShippingMethod: 'Shipping method',
    orderItemColumnActions: 'Actions',
    orderItemColumnName: 'Product',
    orderItemColumnQuantity: 'Quantity',
    orderItemColumnPrice: 'Price per unit',
    orderItemColumnTotal: 'Subtotal',
    orderItemDate: 'From:',
    orderItemNumber: 'Order number:',
    orderItemPaymentMethod: 'Payment method:',
    orderItemShippingMethod: 'Shipping method:',
    orderItemTracking: 'Package tracking:',
    orderItemShippingcosts: 'Shipping costs:',
    orderItemNetTotal: 'Total (net):',
    orderItemTotal: 'Total (gross):',
    orderItemComment: 'Our comment',
    orderItemCustomerComment: 'Your comment',
    orderItemInfoContent: 'Content:',
    orderItemInfoCurrentPrice: 'Current item price',
    orderItemInfoFree: 'FREE',
    orderItemInfoNotAvailable:
      'Product no longer available for a follow-up order',
    orderActionView: 'View',
    orderActionHide: 'Hide',
    orderInfoNoDispatch: 'No stated',
    orderLinkRepeat: 'Repeat order',
    documentItemColumnTitle: 'Document',
    documentItemColumnDate: 'Date',
    documentItemViewFileButton: 'View file',
    newsletterTitle: 'Newsletter subscription',
    newsletterSettings:
      'Yes, I would like to subscribe to the free %shopname% newsletter. (I may unsubscribe at any time.)',
    passwordResetTitle: 'Did you forget your password?',
    passwordResetInfo:
      'If you have forgotten your password, you may enter a new one here. The moment you hit save, your old password will be invalidated.',
    passwordOptInInfo:
      'Confirmation email sent. Click on the included link to change your password.',
    colonCharacter: ':',
    orderGuestLoginTitle: 'Authentication',
    orderGuestLoginDescription:
      'To view your order, please enter your mail address and the postal code given with your billing address.',
    orderGuestLoginWrongCredentials:
      'The given data could not be associated with an order.',
  },
  address: {
    streetLabel: 'Street address',
    streetPlaceholder: 'Enter street address...',
    additionalField1Label: 'Additional address line 1',
    additionalField1Placeholder: 'Enter additional address line...',
    additionalField2Label: 'Additional address line 2',
    additionalField2Placeholder: 'Enter additional address line...',
    zipcodeLabel: 'Postal code',
    zipcodePlaceholder: 'Enter postal code...',
    cityLabel: 'City',
    cityPlaceholder: 'Enter city...',
    countryLabel: 'Country',
    countryPlaceholder: 'Select country...',
    countryStateLabel: 'State',
    countryStatePlaceholder: 'Select state...',
    phoneNumberLabel: 'Phone number',
    phoneNumberPlaceholder: 'Enter phone number...',
    companyNameLabel: 'Company',
    companyNamePlaceholder: 'Enter company...',
    companyDepartmentLabel: 'Department',
    companyDepartmentPlaceholder: 'Enter department...',
    companyVatLabel: 'VAT ID',
    companyVatPlaceholder: 'VAT ID',
  },
  checkout: {
    itemCounter: '{1} 1 item|]1,Inf[ %count% items',
    addressHeader: 'Shipping information',
    addressLoginToggle: 'You already have an account? Click here to login.',
    addressRegisterCardTitle: 'Your personal details',
    registerGuestmodeLabel: 'Do not create a customer account.',
    cartTitle: 'Shopping cart',
    cartHeader: 'Shopping cart',
    cartUpdateSuccess: 'Shopping cart updated',
    continueShopping: 'Continue shopping',
    emptyCart: 'Your shopping cart is empty',
    proceedToCart: 'Go to shopping cart',
    proceedToCheckout: 'Proceed to checkout',
    quantityTimes: 'x',
    priceUnitName: 'Content:',
    removeLineItem: 'Remove product',
    subtotalAmount: 'Subtotal',
    summaryHeader: 'Summary',
    cartEmpty: 'Your shopping cart is empty.',
    cartHeaderInfo: 'Product',
    cartHeaderQuantity: 'Quantity',
    cartHeaderUnitPrice: 'Item price',
    cartHeaderTotalPrice: 'Subtotal',
    cartHeaderTaxIncludeVat: 'incl. VAT',
    cartHeaderTaxExcludeVat: 'excl. VAT',
    cartItemInfoId: 'Product number:',
    addPromotionLabel: 'Enter gift code',
    addPromotionPlaceholder: 'Enter gift card number or discount code...',
    addProductLabel: 'Product number',
    addProductPlaceholder: 'Enter product number...',
    summaryPositionPrice: 'Total',
    summaryShipping: 'Shipping costs',
    summaryTotalPrice: 'Grand total',
    summaryNetPrice: 'Net total',
    summaryTax: 'plus %rate%% VAT',
    proceedLink: 'Proceed to checkout',
    addressEqualText: 'Same as billing address',
    billingAddressHeader: 'Billing address',
    shippingAddressHeader: 'Shipping address',
    confirmHeader: 'Complete order',
    confirmPaymentMethod: 'Payment method',
    confirmPaymentMethodNotAvailable: 'Payment method not available',
    confirmChangePayment: 'Change payment method',
    confirmChoosePayment: 'Choose payment method',
    confirmShippingMethod: 'Shipping method',
    confirmShippingMethodNotAvailable: 'Shipping method not available',
    confirmChangeShipping: 'Change shipping method',
    confirmChooseShipping: 'Choose shipping method',
    confirmCurrentPaymentShipping: 'Current selection:',
    confirmSelectionNone: 'None selected',
    confirmChangePaymentShippingSave: 'Save',
    confirmChangePaymentShippingCancel: 'Cancel',
    confirmSubmit: 'Submit order',
    confirmTermsHeader: 'Terms and conditions and cancellation policy',
    confirmRevocationNotice: 'Please note our cancellation policy.',
    confirmTerms:
      'I have read and accepted the <a data-toggle="modal" data-url="%url%" href="%url%" title="general terms and conditions">general terms and conditions</a>.',
    confirmTermsReminder:
      'You have already accepted the <a data-toggle="modal" data-url="%url%" href="%url%" title="general terms and conditions">general terms and conditions</a>.',
    finishInfoPayment: 'Payment method:',
    finishInfoShipping: 'Shipping method:',
    finishHeader: 'Thank you for your order with %shop%!',
    finishUpdateHeader: 'Thank you for updating your order!',
    finishPaymentHeader:
      "Your order's payment method has been changed to %paymentName%!",
    finishInfoHeader: 'Information',
    finishInfoOrdernumber: 'Your order number: #',
    finishInfoConfirmationMail: 'Order confirmation email has been sent.',
    finishButtonBackToShop: 'Back to shop',
    finishChangePayment: 'Change payment method',
    finishPaymentFailed:
      'Unfortunately, the payment process went wrong. Please change your payment method to finish your order. <a href="%editOrderUrl%">Change payment method</a>',
    codeAddedSuccessful: 'Gift code added successfully.',
    addToCartSuccess:
      '{1} 1 product has been added to the shopping cart.|]1,Inf[ %count% products have been added to the shopping cart.',
    shippingCosts: 'Shipping costs',
    shippingCountry: 'Shipping country',
    paymentMethod: 'Payment method',
    shippingMethod: 'Shipping method',
    'product-stock-reached':
      'The product "%name%" is only available %quantity% times',
    'product-out-of-stock': 'The product "%name%" is not available any more',
    'purchase-steps-quantity':
      'The product "%name%" is not available in this quantity. The quantity was changed to %quantity%',
    'shipping-method-blocked':
      'The shipping method "%name%" is blocked for your current shopping cart.',
    'payment-method-blocked':
      'The payment method "%name%" is blocked for your current shopping cart.',
    lineItemDeliveryDate: 'Delivery period: %earliest% - %latest%',
    'promotion-discount-deleted': 'Discount "%name%" has been removed',
    'promotion-discount-added': 'Discount "%name%" has been added',
    'promotion-not-found': 'Promotion with code "%code%" could not be found.',
    'auto-promotion-not-found': 'Promotion "%name%" no longer valid!',
    'promotion-not-eligible':
      'Promotion code valid - however, not all conditions were met and the discount was not applied. Once all conditions are met, the discount will be applied automatically.',
    'shipping-address-blocked':
      'Shipping to the selected shipping address is currently not possible.',
    'billing-address-blocked':
      'Billing to the selected address is not possible.',
    customerCommentHeader: 'Additional information',
    customerCommentLabel:
      'Would you like to tell us anything about your order?',
    customerCommentPlaceholder: 'Comment here...',
    'cart-merged-hint':
      'The current shopping cart might contain additional products that have been added and saved during a previous visit.',
    'product-not-found': 'The product could not be found.',
  },
  listing: {
    filterTitleText: 'Filter',
    showResults: 'Show results',
    boxUnitLabel: 'Content:',
    boxLabelTopseller: 'Tip',
    boxLabelNew: 'New',
    listingTextSite: 'Page',
    listingTextFrom: 'from',
    boxAddProduct: 'Add to shopping cart',
    boxProductDetails: 'Details',
    emptyResultMessage: 'No products found.',
    filterPanelResetAll: 'Reset all',
    filterFreeShippingDisplayName: 'Free shipping',
    filterPriceDisplayName: 'Price',
    filterManufacturerDisplayName: 'Manufacturer',
    filterRatingDisplayName: 'Rating min.',
    filterRatingActiveLabelStart: 'At least',
    filterRatingActiveLabelEndSingular: 'star',
    filterRatingActiveLabelEnd: 'stars',
    filterRangeMinLabel: 'Minimum',
    filterRangeMaxLabel: 'Maximum',
    filterRangeActiveMinLabel: 'Price from',
    filterRangeActiveMaxLabel: 'Price to',
    filterRangeErrorMessage:
      'The minimum price cannot be higher than the maximum price.',
    filterSubmitText: 'Filter',
    defaultProductSortingLabel: 'Name, ascending',
    disabledFilterTooltip:
      'This filter does not display any further results in combination with the selected filters.',
    beforeListPrice: '',
    afterListPrice: '',
    addToWishlist: 'Add to wish list',
    addedToWishlist: 'Added to wish list',
    toggleWishlist: 'Toggle wishlist',
  },
  newsletter: {
    headline: 'Subscribe to newsletter',
    info:
      'Subscribe to our regular newsletter now and stay tuned on the latest products and special offers. You will be able to unsubscribe from it at any time, using this website or the link included in each newsletter.',
    subscribeOption: 'Subscribe to newsletter',
    unsubscribeOption: 'Unsubscribe from newsletter',
    formSubmit: 'Save',
    subscriptionPersistedSuccess:
      'You have just subscribed to our newsletter.\n To complete the registration process, search your inbox for our confirmation email and click on the link provided with it.',
    subscriptionPersistedInfo:
      'If you did not received an email, please repeat the process or contact our support team.',
    subscriptionRevokeSuccess: 'You have unsubscribed from the newsletter.',
    subscriptionConfirmationSuccess: 'You have subscribed to the newsletter.',
    subscriptionConfirmationFailed:
      'Newsletter subscription did not work properly, please contact our support team.',
    subscriptionCompleted: 'Thank you! We have registered your address.',
    labelActionSelect: 'Action',
    labelMail: 'Email address',
    labelFirstName: 'First name',
    labelLastName: 'Last name',
    placeholderMail: 'john@doe.com',
    placeholderFirstName: 'John',
    placeholderLastName: 'Doe',
  },
  contact: {
    headline: 'Contact',
    info: 'We look forward to hearing from you.',
    subjectLabel: 'Subject',
    subjectPlaceholder: 'Enter subject...',
    commentLabel: 'Comment',
    commentPlaceholder: 'Enter comment...',
    formSubmit: 'Submit',
    success:
      'We have received your contact request and will process it as soon as possible.',
  },
  search: {
    headline:
      '{0} 0 products found for "%searchTerm%" | {1} One product found for "%searchTerm%" | ]1,Inf[ %count% products found for "%searchTerm%"',
  },
  detail: {
    ordernumberLabel: 'Product number:',
    productNumberLabel: 'Product number:',
    addProduct: 'Add to shopping cart',
    tabsDescription: 'Description',
    tabsPreviewMore: 'More',
    descriptionTitle: 'Product information',
    priceUnitName: 'Content:',
    priceDataInfoUntil: 'To',
    priceDataInfoFrom: 'From',
    listPricePercentage: '(%price%% saved)',
    dataColumnQuantity: 'Quantity',
    dataColumnPrice: 'Item price',
    dataColumnReferencePrice: 'Unit price',
    deliveryTimeAvailable: 'Available, delivery time %name%',
    deliveryTimeRestock:
      '{1} Available in 1 day, delivery time %name%|]1,Inf[ Available in %restockTime% days, delivery time %name%',
    soldOut: 'No longer available',
    tabsReview: 'Reviews',
    reviewTitle: '%count% of %total% reviews',
    reviewVerifiedItemTooltip: 'Verified buyer',
    reviewCommentLabel: 'Our feedback: ',
    reviewLinkText: '{1} Review|]1,Inf[ Reviews',
    reviewFormRatingLabel: 'Your rating',
    reviewFormTitleLabel: 'Title',
    reviewFormTitlePlaceholder: 'Enter a title...',
    review1PointRatingText: 'Unsatisfactory',
    review2PointRatingText: 'Acceptable',
    review3PointRatingText: 'Good',
    review4PointRatingText: 'Very good',
    review5PointRatingText: 'Excellent',
    reviewFormContentLabel: 'Your review',
    reviewFormSubmitText: 'Submit',
    reviewFormCancelText: 'Cancel',
    reviewFormErrorAlert:
      'An error occured. Please make sure you filled in all fields correctly.',
    reviewFormSuccessAlert:
      'Thank you for submitting your review. We will examine the review and eventually unlock it. In the meantime, please be patient.',
    reviewFormSuccessUpdateAlert:
      'Thank you for editing your review. Changes will be visible as soon as we have unlocked them.',
    reviewTeaserTitle: 'Leave a review!',
    reviewTeaserText: 'Share your experiences with other customers.',
    reviewTeaserButton: 'Write a review!',
    reviewTeaserButtonHide: 'Show reviews',
    reviewExistsTeaserTitle: 'Edit your review!',
    reviewExistsTeaserText:
      'You have already reviewed this product. Would you like to edit your review?',
    reviewExistsTeaserButton: 'Edit review',
    reviewLanguageFilterLabel: 'Display reviews in current language only.',
    reviewSortLabel: 'Sort by',
    reviewSortTopRatedLabel: 'Top rated',
    reviewSortNewLabel: 'Most recent',
    reviewCountAfter: '{1} review|]1,Inf[ reviews',
    reviewCountBefore: 'of',
    reviewListEmpty: 'No reviews found. Be the first to share your insights.',
    reviewLoginHeader: 'Login',
    reviewLoginDescription:
      'Reviews can only be submitted while being logged in. Please enter your login details below.',
    reviewRegisterLink: 'New customer?',
    reviewLoginSignupLink: 'Click here to sign up.',
    reviewLoginCancelButton: 'Cancel',
    reviewAvgRate: 'out of',
    reviewAvgRateElements: 'stars',
  },
  wishlist: {
    headline: 'Your wishlist',
    itemDeleteSuccess:
      'You have successfully removed the product from the wishlist.',
    itemAddedSuccess:
      'You have successfully added the product into the wishlist.',
    currentlyNotAvailable: 'Currently not available',
    manufacturerDisplayName: 'Manufacturer',
    deliveryTimeAvailable: 'Available, delivery time %name%',
    noLongerAvailableTooltip: 'The product is no longer available.',
  },
  footer: {
    serviceHotlineHeadline: 'Service hotline',
    shopServiceHeadline: 'Shop service',
    informationHeadline: 'Information',
    newsletterHeadline: 'Newsletter',
    serviceHotline:
      'Support and counselling via: <a href="tel:+49180000000">0180 - 000000</a> Mon-Fri, 9 am - 5 pm',
    serviceContactLink:
      'Or via our <a data-toggle="modal" data-url="%url%" href="%url%" title="contact form">contact form</a>.',
    newsletterInput: 'Your email address',
    newsletter:
      'Subscribe to our regular newsletter now to stay tuned on the latest products and special offers.',
    includeVat:
      '* All prices incl. VAT plus <a data-toggle="modal" href="%url%" data-url="%url%">shipping costs</a> and possible delivery charges, if not stated otherwise.',
    excludeVat:
      '* All prices excl. VAT plus <a data-toggle="modal" href="%url%" data-url="%url%">shipping costs</a> and possible delivery charges, if not stated otherwise.',
    copyrightInfo: 'Realised with Shopware',
  },
  cookie: {
    message:
      'This website uses cookies to ensure the best experience possible. <a data-toggle="modal" data-url="%url%" href="%url%" title="More information">More information...</a>',
    deny: 'Deny',
    configure: 'Configure',
    configuration: 'Settings',
    save: 'Save',
    acceptAll: 'Accept all cookies',
    headline: 'Cookie preferences',
    groupRequired: 'Technically required',
    groupRequiredDescription: 'Cookies required for this shop to function:',
    groupRequiredSession: 'Session',
    groupRequiredCsrf: 'CSRF protection',
    groupRequiredTimezone: 'Timezone',
    groupStatistical: 'Statistics',
    groupStatisticalDescription:
      'Cookies used for statistics and shop performance metrics.',
    groupStatisticalGoogleAnalytics: 'Google Analytics',
    groupComfortFeatures: 'Comfort features',
    groupComfortFeaturesWishlist: 'Wishlist',
  },
  ellipsis: {
    expandLabel: 'show more',
    shrinkLabel: 'show less',
  },
  component: {
    product: {
      feature: {
        label: {
          manufacturerNumber: 'Supplier number:',
          ean: 'EAN:',
          weight: 'Weight:',
          width: 'Width:',
          height: 'Height:',
          length: 'Length:',
          releaseDate: 'Release date:',
          description: 'Description:',
          referencePrice: 'Content:',
        },
        customField: {
          true: 'Yes',
          false: 'No',
        },
      },
    },
    cms: {
      vimeo: {
        privacyNotice:
          'By viewing the video you agree that your data will be transferred to %platform% and that you have read the <a data-toggle="modal" data-url="%url%" href="%url%" title="Privacy policy">Privacy policy</a>.',
        acceptButtonLabel: 'Accept',
      },
    },
  },
};